function updateVisibility(tabId) {
	chrome.tabs.sendMessage(tabId, {action: 'find-yt-print-button'}, function (hasPrintButton) {
		if (hasPrintButton) {
			chrome.pageAction.show(tabId);
		}
	});
}

chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
	if (change.status === "complete") {
		updateVisibility(tabId);
	}
});
