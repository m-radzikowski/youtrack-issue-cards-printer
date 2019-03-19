function setElementText(element, content) {
	if (content !== undefined && content !== null) {
		let value;
		if (Array.isArray(content)) {
			value = content.join(', ');
		} else {
			value = content;
		}

		element.getElementsByTagName('span')[0].innerHTML = value;
	} else {
		element.className += ' hide';
	}
}

function setElementColor(element, color) {
	if (color !== undefined && color !== null) {
		element.style.background = color.bg;
		element.style.color = color.fg;
	}
}

function fillCard(card, fields) {
	card.querySelectorAll('[data-field]').forEach(node => {
		setElementText(node, fields[node.dataset.field]);
		setElementColor(node, fields[node.dataset.field + 'Color']);
	});
}
