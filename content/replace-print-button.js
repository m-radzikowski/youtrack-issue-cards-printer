(function () {
	console.log('a');
	const button = document.getElementById('id_l.I.c.tb.printIssues');
	console.log('x', button);
	if (button) {
		console.log('b');
		button.removeAttribute('cn'); // attribute that triggers default print page load
		button.onclick = function (e) {
			chrome.runtime.sendMessage({action: "print-youtrack-issues"});
			e.preventDefault();
		};
	}
})();