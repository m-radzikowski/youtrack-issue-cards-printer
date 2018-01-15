(function () {
	function showError(tab, msg) {
		chrome.tabs.sendMessage(tab.id, {action: 'show-error', errorText: msg});
	}

	function getLocation(href) {
		const l = document.createElement("a");
		l.href = href;
		return l;
	}

	function getQueryVariable(location, variable, def) {
		const query = location.search.substring(1);
		const vars = query.split('&');
		for (let i = 0; i < vars.length; i++) {
			const pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) === variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		return def;
	}

	function getContextQuery(location) {
		const pathname = location.pathname;

		let context = '';
		if (pathname.startsWith('/issues/')) {
			context = pathname.substr('/issues/'.length);
		} else if (pathname.startsWith('/tag/') || pathname.startsWith('/search/')) {
			const tag = pathname.substr(pathname.indexOf('/', 1) + 1);
			context = tag.substring(0, tag.lastIndexOf('-'));
		}

		return context ? '#{' + decodeURIComponent(context) + '}' : ''
	}

	function fetchIssues(url, callback) {
		const xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function (e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					try {
						const data = JSON.parse(xhr.responseText);
						const result = {
							successful: true,
							data: data
						};
						callback(result);
					} catch (e) {
						if (e instanceof SyntaxError) {
							console.error("Failed to parse response", xhr);
							alert("Failed to parse API response");
						} else {
							console.error(e, xhr);
							alert("Unexpected error");
						}
					}
				} else {
					console.error('Error fetching issues, http code: ' + xhr.status, e, xhr);
					const result = {
						successful: false,
					};
					callback(result);
				}
			}
		};

		xhr.open("GET", url, true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
	}

	function findAndPrintIssues(tab) {
		chrome.tabs.executeScript(tab.id, {file: 'background/find-issues-per-page.js'}, function (results) {
			const issuesPerPage = parseInt(results[0]) || 100;

			const location = getLocation(tab.url);
			const origin = location.origin;
			const skipIssues = getQueryVariable(location, 'p', 0);

			let query = getQueryVariable(location, 'q', '');
			if (!query.includes('sort by')) { // add default sort - by updated
				query += ' sort by: updated';
			}
			query = '(' + query + ') and ' + getContextQuery(location);

			const restUrl = origin + '/rest/issue?' +
				'filter=' + encodeURIComponent(query) +
				'&max=' + issuesPerPage +
				'&after=' + skipIssues;

			fetchIssues(restUrl, function (result) {
				if (result.successful) {
					if (result.data.issue.length === 0) {
						showError(tab, 'No issues found to print.');
					} else {
						singleton.getInstance().data = result.data;
						chrome.tabs.create({url: chrome.runtime.getURL('print/print.html')});
					}
				} else {
					showError(tab, 'Error occurred while fetching issues.');
				}
			});
		});
	}

	chrome.runtime.onMessage.addListener(function (request, sender) {
		if (sender.tab && request.action === 'print-youtrack-issues') {
			findAndPrintIssues(sender.tab);
		}
	});

	chrome.pageAction.onClicked.addListener(function (tab) {
		findAndPrintIssues(tab);
	});
})();