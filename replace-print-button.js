(function () {
	const button = document.getElementById('id_l.I.c.tb.printIssues');
	if (button) {
		button.removeAttribute('cn'); // attribute that triggers default print page load
		button.onclick = function () {
			chrome.runtime.sendMessage({action: "print-youtrack-issues"});
		};
	}
})();