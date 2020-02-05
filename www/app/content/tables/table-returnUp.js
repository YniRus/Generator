function ReturnUp(e) {
	var Element = e.target;
	var BackToTable = $(Element).attr('id').split("-")[1];
	if (BackToTable == "Subject" && BackToTable != Table) {
		Table = "Subject";
		var str = $("#bc-Subject").removeClass("breadcrumb-active");
		$("#bc-Theme").addClass("d-none");
		$("#bc-Question").addClass("d-none");
		$(".table-headtext").text("Список ваших предметов");
		$.get("content/tables/table-subject/GetSubjectsInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: TeacherID
		}, CreateTable);
	}
	if (BackToTable == "Theme" && BackToTable != Table) {
		Table = "Theme";
		var str = $("#bc-Theme").removeClass("breadcrumb-active");
		$("#bc-Question").addClass("d-none");
		$(".table-headtext").text("Список тем по предмету " + SubjectName);
		$.get("content/tables/table-theme/GetThemesInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: SubjectID
		}, CreateTable);
	}
}
