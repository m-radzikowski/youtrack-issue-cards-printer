(function () {
	// error shown from content script,
	// as alert() called from background shows on Linux old-style, ugly windowed popup
	chrome.runtime.onMessage.addListener(function (request) {
		if (request.action === "show-error") {
			alert(request.errorText);
		}
	});
})();
