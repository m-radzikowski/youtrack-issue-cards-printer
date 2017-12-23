function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj))
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowercaseFirstLetter(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function convertIssueFieldArray(issue) {
	issue.field = issue.field.reduce(function (total, current) {
		let name = current.name
			.split(' ')
			.map(value => capitalizeFirstLetter(value))
			.join('');
		name = lowercaseFirstLetter(name);

		total[name] = current.value;
		if ('color' in current) {
			total[name + 'Color'] = current.color;
		}
		return total;
	}, {});
}

function setCardElementText(card, className, content) {
	const element = card.getElementsByClassName(className)[0];

	if (content !== undefined) {
		let value;
		if (typeof content === 'string') {
			value = content;
		} else {
			value = content[0];
		}

		element.getElementsByTagName('span')[0].innerHTML = value;
	} else {
		element.className += ' hide';
	}
}

function setCardElementColor(card, className, color) {
	const element = card.getElementsByClassName(className)[0].getElementsByTagName('span')[0];

	if (color !== undefined && color !== null) {
		element.style.background = color.bg;
		element.style.color = color.fg;
	}
}

const data = cloneObject(chrome.extension.getBackgroundPage().singleton.getInstance().data);

const cardTemplate = document.getElementById('card-template');
const issuesWrapper = document.getElementById('issues-wrapper');

data.issue.forEach(function (issue) {
	convertIssueFieldArray(issue);

	const card = cardTemplate.cloneNode(true);
	card.id = '';

	issuesWrapper.appendChild(card);

	setCardElementText(card, 'issue-id', issue.id);
	setCardElementText(card, 'issue-summary', issue.field.summary);
	setCardElementText(card, 'issue-type', issue.field.type);
	setCardElementColor(card, 'issue-type', issue.field.typeColor);
	setCardElementText(card, 'issue-points', issue.field.storyPoints);
	setCardElementText(card, 'issue-priority', issue.field.priority);
	setCardElementColor(card, 'issue-priority', issue.field.priorityColor);
});

window.print();
setTimeout(window.close, 0);
