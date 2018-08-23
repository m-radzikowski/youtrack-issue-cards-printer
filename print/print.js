(function () {
	function cloneObject(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function lowercaseFirstLetter(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	/**
	 * Gets fields array from the issue and converts it to object
	 * with field names as keys and field values as values. Keys are unified to camelCase.
	 * Additionally, there are added keys:
	 * 1. id with issue ID.
	 * 2. xxxColor for fields containing "color" parameter, with "bg" and "fg" fields, where xxx is the field's name.
	 * 3. linkXxx for issue links, containing array of links of given type, where Xxx is the link's type.
	 */
	function getIssueFields(issue) {
		const fields = issue.field.reduce(function (fields, field) {
			let name = field.name
				.split(' ')
				.map(value => capitalizeFirstLetter(value))
				.join('');
			name = lowercaseFirstLetter(name);

			fields[name] = field.value;

			if ('color' in field) {
				fields[name + 'Color'] = field.color;
			}

			if (name === 'links') {
				const links = field.value.reduce(function (types, link) {
					(types['link' + link['type']] = types['link' + link['type']] || []).push(link.value);
					return types;
				}, {});
				Object.assign(fields, links);
			}
			return fields;
		}, {});

		fields.id = issue.id;

		return fields;
	}

	function setElementText(element, content) {
		if (content !== undefined && content !== null) {
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

	function setElementColor(element, color) {
		if (color !== undefined && color !== null) {
			element.style.background = color.bg;
			element.style.color = color.fg;
		}
	}

	function showPrintPopup() {
		// despite font is loaded in CSS before the JS, sometimes print page opens with default font
		// opening print window with little delay should solve this problem, as browser should display font
		// properly up to this point
		setTimeout(window.print, 100);

		// close page after exit from print mode
		setTimeout(window.close, 200);
	}

	chrome.storage.sync.get({ // TODO Remove duplicated sync.get with defaults (options.js)
		debug_mode: false
	}, function (config) {
		const data = cloneObject(chrome.extension.getBackgroundPage().singleton.getInstance().data);

		if (config.debug_mode) {
			console.log(`Fetched ${data.issue.length} issues`);
		}

		const cardTemplate = document.getElementById('card-template');
		const issuesWrapper = document.getElementById('issues-wrapper');

		data.issue.forEach(function (issue) {
			const fields = getIssueFields(issue);
			if (config.debug_mode) {
				console.log(`Issue ${issue.id} fields:`, fields);
			}

			const card = cardTemplate.cloneNode(true);
			card.id = '';

			issuesWrapper.appendChild(card);

			card.querySelectorAll('[data-field]').forEach(node => {
				setElementText(node, fields[node.dataset.field]);
				setElementColor(node, fields[node.dataset.field + 'Color']);
			});
		});

		if (!config.debug_mode) {
			showPrintPopup();
		}
	});
})();