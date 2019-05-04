chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				actions: [
					new chrome.declarativeContent.ShowPageAction()
				],
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						css: ["button[id=\"id_l.I.c.tb.printIssues\"], button[id=\"id_l.T.Issues.c.tb.printIssues\"], button[id=\"id_l.S.Issues.c.tb.printIssues\"], yt-issues-toolbar"]
					})
				]
			}
		]);
	});
});
