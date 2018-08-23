const resizeViewPort = function (width, height) {
	if (window.outerWidth) {
		window.resizeTo(
			width + (window.outerWidth - window.innerWidth),
			height + (window.outerHeight - window.innerHeight)
		);
	} else {
		window.resizeTo(500, 500);
		window.resizeTo(
			width + (500 - document.body.offsetWidth),
			height + (500 - document.body.offsetHeight)
		);
	}
};

const wrapper = document.getElementsByClassName('card-wrapper')[0];
resizeViewPort(wrapper.offsetWidth, wrapper.offsetHeight);

const defaultTemplate = `<div class="magnet-place"></div>
<div class="issue-summary" data-field="summary"><span></span></div>
<div class="issue-id" data-field="id"><span></span></div>
<div class="issue-parent-id" data-field="linkSubtask">subtask of <span></span></div>
<div class="issue-type" data-field="type"><span></span></div>
<div class="issue-subsystem" data-field="subsystem"><span></span></div>
<div class="issue-points" data-field="storyPoints"><span></span></div>
<div class="issue-priority" data-field="priority"><span></span></div>`;

chrome.storage.sync.get({
	custom_layout: false,
	custom_template: defaultTemplate,
	custom_styles: ''
}, function (config) {
	const card = document.getElementsByClassName('card')[0];
	if (config.custom_layout) {
		card.innerHTML = config.custom_template;
	} else {
		card.innerHTML = defaultTemplate;
	}
});