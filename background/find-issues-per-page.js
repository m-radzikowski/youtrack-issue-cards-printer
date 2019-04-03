(function () {
	const perPageSelect = document.getElementById('id_l.I.c.bb.issuesPerPage');
	return perPageSelect ? perPageSelect.options[perPageSelect.selectedIndex].value : null;
})();
