(function () {
	/**
	 * On regular issues list page and on issues list for tag or saved search context print button id differs.
	 */
	function findPrintButton() {
		const ids = ['id_l.I.c.tb.printIssues', 'id_l.T.Issues.c.tb.printIssues', 'id_l.S.Issues.c.tb.printIssues'];
		for (let i = 0; i < ids.length; i++) {
			const button = document.getElementById(ids[i]);
			if (button) {
				return button;
			}
		}
		return null;
	}

	const button = findPrintButton();

	if (button) {
		button.removeAttribute('cn'); // attribute that triggers default print page load
		button.onclick = function (e) {
			chrome.runtime.sendMessage({action: "print-youtrack-issues"});
			e.preventDefault();
		};
	}

	if (window === top) {
		chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
			if (req.action === 'find-yt-print-button') {
				sendResponse(button !== null);
			}
		});
	}
})();