function DoSearch() {
	var SubStr = $("#Search").val();

	$("[id^='Name-'],[id^='Type-']").each(function (index, value) {
		$(this).closest("tr").addClass("d-none");
	});

	$("[id^='Name-'],[id^='Type-']").each(function (index, value) {
		if ($(this).text().indexOf(SubStr) != -1) {
			$(this).closest("tr").removeClass("d-none");
		}
	});
}
