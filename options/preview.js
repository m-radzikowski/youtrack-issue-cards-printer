function resizeViewPort(width, height) {
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
}

const wrapper = document.getElementsByClassName('card-wrapper')[0];
resizeViewPort(wrapper.offsetWidth, wrapper.offsetHeight);

const mockFields = {
	id: 'PRINT-123',
	assigneeFullName: 'John Doe',
	assigneeValue: 'jdoe',
	commentsCount: '3',
	created: Date.now(),
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit ante, facilisis eget sapien sit amet, rhoncus sagittis nisl.',
	linkSubtaskSubtaskOf: ['PRINT-42'],
	linkSubtaskParentFor: ['PRINT-200', 'PRINT-201'],
	linkProblemIncidentIsCausedBy: ['PRINT-3'],
	linkProblemIncidentCauses: ['PRINT-7'],
	numberInProject: '123',
	priority: 'Normal',
	priorityColor: {bg: '#e6f6cf', fg: '#4da400'},
	projectShortName: 'PRINT',
	reporterFullName: 'John Doe',
	reporterName: 'john',
	spentTime: '17190',
	state: 'Open',
	stateColor: {bg: '#fed74a', fg: '#444'},
	summary: 'Example issue for the preview',
	type: 'Feature',
	typeColor: {bg: '#409600', fg: '#fff'},
	updated: Date.now(),
	updaterFullName: 'Jane Doe',
	updaterName: 'jane',
	subsystem: 'Printer',
	subsystemColor: {bg: '#553000', fg: '#fff'},
	storyPoints: '8'
};

getConfig(function (config) {
	const card = document.getElementsByClassName('card')[0];
	if (config.customLayout) {
		card.innerHTML = config.customTemplate;
		document.getElementById('custom-styles').innerHTML = config.customStyles;
	} else {
		card.innerHTML = DEFAULT_TEMPLATE;
	}

	fillCard(card, mockFields);
});
