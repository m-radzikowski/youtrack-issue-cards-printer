(function () {
	function cloneObject(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	function camelize(str) { // https://stackoverflow.com/a/2970667/2512304
		return str.replace('-', ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (+match === 0) return "";
			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		});
	}

	function uppercaseFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Gets fields array from the issue and converts it to object
	 * with field names as keys and field values as values. Keys are unified to camelCase.
	 * Array values are simplified to just first item from the array.
	 * Object values are flattened, with keys built from field name and object property names.
	 * Additionally, there are added keys:
	 * 1. id with issue ID.
	 * 2. xxxColor for fields containing "color" parameter, with "bg" and "fg" fields, where xxx is the field's name.
	 * 3. linkXxxYyy for issue links, containing array of links of given type, where Xxx is the link's type and Yyy is the links role.
	 */
	function getIssueFields(issue) {
		const fields = issue.field.reduce((fields, field) => {
			const name = camelize(field.name);
			let newFields = {};

			if (name === 'links') {
				newFields = getIssueLinkFields(field);
			} else {
				const value = Array.isArray(field.value) ? field.value[0] : field.value;

				if (typeof value == "object") {
					newFields = getObjectFields(name, value);
				} else {
					newFields[name] = value;
				}

				if ('color' in field) {
					newFields[name + 'Color'] = field.color;
				}
			}

			Object.assign(fields, newFields);
			return fields;
		}, {});

		fields.id = issue.id;

		return fields;
	}

	function getIssueLinkFields(field) {
		return field.value.reduce((types, link) => {
			const linkName = camelize(`link ${link['type']} ${link['role']}`);
			(types[linkName] = types[linkName] || []).push(link.value);
			return types;
		}, {});
	}

	function getObjectFields(baseName, obj) {
		const fields = [];
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				fields[baseName + uppercaseFirstLetter(key)] = obj[key];
			}
		}
		return fields;
	}

	function showPrintPopup() {
		// despite font is loaded in CSS before the JS, sometimes print page opens with default font
		// opening print window with little delay should solve this problem, as browser should display font
		// properly up to this point
		setTimeout(window.print, 200);

		// close page after exit from print mode
		setTimeout(window.close, 200);
	}

	getConfig(function (config) {
		const data = cloneObject(chrome.extension.getBackgroundPage().singleton.getInstance().data);

		if (config.debugMode) {
			console.log(`Fetched ${data.issue.length} issues`);
		}

		const cardTemplate = document.getElementById('card-template');
		const issuesWrapper = document.getElementById('issues-wrapper');

		data.issue.forEach(function (issue) {
			const fields = getIssueFields(issue);
			if (config.debugMode) {
				console.log(`Issue ${issue.id} fields:`, fields);
			}

			const template = cardTemplate.cloneNode(true);
			template.id = '';

			issuesWrapper.appendChild(template);

			const card = template.getElementsByClassName('card')[0];

			if (config.customLayout) {
				card.innerHTML = config.customTemplate;
				document.getElementById('custom-styles').innerHTML = config.customStyles;
			} else {
				card.innerHTML = DEFAULT_TEMPLATE;
			}

			fillCard(card, fields);
		});

		if (!config.debugMode) {
			showPrintPopup();
		}
	});
})();
