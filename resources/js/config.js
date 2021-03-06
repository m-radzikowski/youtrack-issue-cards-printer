const DEFAULT_TEMPLATE = `<div class="magnet-place"></div>
<div class="issue-summary" data-field="summary"><span></span></div>
<div class="issue-id" data-field="id"><span></span></div>
<div class="issue-id-caption" data-field="linkSubtaskSubtaskOf">subtask of <span></span></div>
<div class="issue-top-label issue-right" data-field="type"><span></span></div>
<div class="issue-top-label issue-left" data-field="subsystem"><span></span></div>
<div class="issue-points" data-field="storyPoints"><span></span></div>
<div class="issue-priority" data-field="priority"><span></span></div>`;

const DEFAULT_CONFIG = {
	customLayout: false,
	customTemplate: DEFAULT_TEMPLATE,
	customStyles: '',
	debugMode: false
};

function getConfig(callback) {
	chrome.storage.sync.get(DEFAULT_CONFIG, callback);
}

function setConfig(config, callback) {
	chrome.storage.sync.set(config, callback);
}
