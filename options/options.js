const $customLayout = $('#custom-layout');
const $customLayoutEdit = $('.custom-layout');
const $cardTemplate = $('#card-template');
const $cardStyles = $('#card-styles');
const $debugMode = $('#debug-mode');

getConfig(function (config) {
	$customLayout.prop('checked', config.customLayout).trigger('change');
	$cardTemplate.val(config.customTemplate);
	$cardStyles.val(config.customStyles);
	$debugMode.prop('checked', config.debugMode);
});

const manifest = chrome.runtime.getManifest();
$('.customizing-cards').attr('href', `https://github.com/m-radzikowski/youtrack-issue-cards-printer/tree/v${manifest.version}/doc/customization.md`);
$('.available-fields').attr('href', `https://github.com/m-radzikowski/youtrack-issue-cards-printer/tree/v${manifest.version}/doc/customization.md#fields`);
$('.default-stylesheet').attr('href', `https://github.com/m-radzikowski/youtrack-issue-cards-printer/tree/v${manifest.version}/resources/css/card.less`);

$customLayout.change(function () {
	const checked = $(this).is(":checked");
	setConfig({
		customLayout: checked
	});
	checked ? $customLayoutEdit.show() : $customLayoutEdit.hide();
});

function saveCustomValues(callback) {
	setConfig({
		customTemplate: $cardTemplate.val(),
		customStyles: $cardStyles.val()
	}, callback);
}

$cardTemplate.blur(function () {
	saveCustomValues();
});

$cardStyles.blur(function () {
	saveCustomValues();
});

$('#load-default-template').click(function (e) {
	$cardTemplate.val(DEFAULT_TEMPLATE);
	saveCustomValues();
	e.preventDefault();
});

$debugMode.change(function () {
	const checked = $(this).is(":checked");
	setConfig({
		debugMode: checked
	});
});

$('#show-preview').click(function () {
	saveCustomValues(function () {
		window.open('options/preview.html', 'card-preview', 'width=500, height=500');
	});
});