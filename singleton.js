singleton = (function () {
	let instance;

	function createInstance() {
		return {
			data: {}
		};
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();
