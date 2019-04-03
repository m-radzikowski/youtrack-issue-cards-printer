(function () {
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

	function getBasePath(location) {
		const pathname = location.pathname;

		const possiblePaths = ['/issues', '/tag', '/search'];
		for (let i = 0; i < possiblePaths.length; i++) {
			const path = possiblePaths[i];

			const idx = pathname.indexOf(path);
			if (idx !== -1) {
				return pathname.substr(0, idx);
			}
		}

		return '';
	}

	function getContextQuery(location) {
		const pathname = location.pathname;

		let context = '';
		if (pathname.includes('/issues/')) {
			context = pathname.substr(pathname.lastIndexOf('/') + 1);
		} else if (pathname.includes('/tag/') || pathname.includes('/search/')) {
			const tag = pathname.substr(pathname.lastIndexOf('/') + 1);
			context = tag.substring(0, tag.lastIndexOf('-'));
		}

		return context ? '#{' + decodeURIComponent(context) + '}' : ''
	}

	function fetchIssues(tab, url, callback) {
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
							alert('Failed to parse API response');
						} else {
							console.error(e, xhr);
							alert('Unexpected error');
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
		// On the new (experimental) issues list in YT 2019.1 there is no more "issues per page" choice,
		// and there are always up to 100 items loaded.
		// Issues per page check may be removed in future, when dropping support for old layout.
		chrome.tabs.executeScript(tab.id, {file: 'background/find-issues-per-page.js'}, function (results) {
			const issuesPerPage = parseInt(results[0]) || 100;

			const location = getLocation(tab.url);
			const origin = location.origin;
			const skipIssues = getQueryVariable(location, 'p', 0);
			const basePath = getBasePath(location);

			let query = getQueryVariable(location, 'q', '');
			if (!query.includes('sort by')) { // add default sort - by updated
				query += ' sort by: updated';
			}
			query = '(' + query + ') and ' + getContextQuery(location);

			const restUrl = origin + basePath + '/rest/issue?' +
				'filter=' + encodeURIComponent(query) +
				'&max=' + issuesPerPage +
				'&after=' + skipIssues;

			fetchIssues(tab, restUrl, function (result) {
				if (result.successful) {
					if (result.data.issue.length === 0) {
						alert('No issues found to print.');
					} else {
						singleton.getInstance().data = result.data;
						chrome.tabs.create({url: chrome.runtime.getURL('print/print.html')});
					}
				} else {
					alert('Error occurred while fetching issues.');
				}
			});
		});
	}

	// There is no support for clicking print button no the new (experimental) issues list in YT 2019.1.
	chrome.runtime.onMessage.addListener(function (request, sender) {
		if (sender.tab && request.action === 'print-youtrack-issues') {
			findAndPrintIssues(sender.tab);
		}
	});

	chrome.pageAction.onClicked.addListener(function (tab) {
		findAndPrintIssues(tab);
	});
})();
