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

function fetchIssues(url, callback) {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				callback(data);
			} else {
				console.error('Error fetching issues, http code: ' + xhr.status, e, xhr);
				// TODO Open error page / documentation
			}
		}
	};

	xhr.open("GET", url, true);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.send();
}

function findAndPrintIssues(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'find-issues-per-page.js'}, function (results) {
		const issuesPerPage = parseInt(results[0]) || 100;

		const location = getLocation(tab.url);
		const origin = location.origin;
		const skipIssues = getQueryVariable(location, 'p', 0);

		let query = getQueryVariable(location, 'q', ''); // TODO Search context - currently works for "everything", see: https://youtrack.jetbrains.com/issue/JT-45011
		if (!query.includes('sort by')) { // add default sort - by updated
			query += ' sort by: updated';
		}

		const restUrl = origin + '/rest/issue?' +
			'filter=' + encodeURIComponent(query) +
			'&max=' + issuesPerPage +
			'&after=' + skipIssues;

		fetchIssues(restUrl, function (data) {
			singleton.getInstance().data = data;
			chrome.tabs.create({url: chrome.runtime.getURL('print.html')});
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