const $customLayout = $('#custom-layout');
const $customLayoutEdit = $('.custom-layout');
const $cardTemplate = $('#card-template');
const $cardStyles = $('#card-styles');
const $debugMode = $('#debug-mode');

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
	custom_styles: '',
	debug_mode: false
}, function (config) {
	$customLayout.prop('checked', config.custom_layout).trigger('change');
	$cardTemplate.val(config.custom_template);
	$cardStyles.val(config.custom_styles);
	$debugMode.prop('checked', config.debug_mode);
});

const manifest = chrome.runtime.getManifest();
$('.default-stylesheet').attr('href', `https://github.com/m-radzikowski/youtrack-issue-cards-printer/blob/v${manifest.version}/print/card.less`);

$customLayout.change(function () {
	const checked = $(this).is(":checked");
	chrome.storage.sync.set({
		custom_layout: checked
	});
	checked ? $customLayoutEdit.show() : $customLayoutEdit.hide();
});

function saveCustomValues(callback) {
	chrome.storage.sync.set({
		custom_template: $cardTemplate.val(),
		custom_styles: $cardStyles.val()
	}, callback);
}

$cardTemplate.blur(function () {
	saveCustomValues();
});

$cardStyles.blur(function () {
	saveCustomValues();
});

$('#load-default-template').click(function (e) {
	$cardTemplate.val(defaultTemplate);
	saveCustomValues();
	e.preventDefault();
});

$debugMode.change(function () {
	const checked = $(this).is(":checked");
	chrome.storage.sync.set({
		debug_mode: checked
	});
});

$('#show-preview').click(function () {
	saveCustomValues(function () {
		window.open('options/preview.html', 'card-preview', 'width=500, height=500');
	});
});