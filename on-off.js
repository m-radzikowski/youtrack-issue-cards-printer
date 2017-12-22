chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					css: ['yt-header', '.issues-center', '.issues-wrapper']
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
