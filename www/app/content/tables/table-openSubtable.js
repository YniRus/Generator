function onEyeClick(e) {
	var Element = e.target;

	var ToTable = $(Element).closest("a").attr('id').split("-")[1];
	if (ToTable == "Theme") {
		SubjectID = $(Element).closest("tr").attr('id').split("-")[1];
		var Name = $("#Name-" + SubjectID).text();
		SubjectName = Name;
		Table = ToTable;
		$("#bc-Subject").addClass("breadcrumb-active");
		$("#bc-Theme").removeClass("breadcrumb-active d-none");

		$(".table-headtext").text("Список тем по предмету " + Name);

		$.get("content/tables/table-theme/GetThemesInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: SubjectID
		}, CreateTable);
	}
	if (ToTable == "Question") {
		ThemeID = $(Element).closest("tr").attr('id').split("-")[1];
		var Name = $("#Name-" + ThemeID).text();
		Table = ToTable;
		var str = $("#bc-Theme").addClass("breadcrumb-active");
		$("#bc-Question").removeClass("d-none");

		$(".table-headtext").text("Список вопросов по теме " + Name);

		$.get("content/tables/table-question/GetQuestionsInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: ThemeID
		}, CreateTable);
	}

}
