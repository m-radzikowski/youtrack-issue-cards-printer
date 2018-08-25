const DEFAULT_TEMPLATE = `<div class="magnet-place"></div>
<div class="issue-summary" data-field="summary"><span></span></div>
<div class="issue-id" data-field="id"><span></span></div>
<div class="issue-parent-id" data-field="linkSubtask">subtask of <span></span></div>
<div class="issue-type" data-field="type"><span></span></div>
<div class="issue-subsystem" data-field="subsystem"><span></span></div>
<div class="issue-points" data-field="storyPoints"><span></span></div>
<div class="issue-priority" data-field="priority"><span></span></div>`;

const DEFAULT_CONFIG = {
	custom_layout: false,
	custom_template: DEFAULT_TEMPLATE,
	custom_styles: '',
	debug_mode: false
};

function getConfig(callback) {
	chrome.storage.sync.get(DEFAULT_CONFIG, callback);
}

function setConfig(config, callback) {
	chrome.storage.sync.set(config, callback);
}
