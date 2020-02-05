function SortByClick(e) {
	var WhereID;
	if (Table == "Subject") {
		WhereID = TeacherID;
	}
	if (Table == "Theme") {
		WhereID = SubjectID;
	}
	if (Table == "Question") {
		WhereID = ThemeID;
	}

	var Element = e.target;
	if ($(Element).hasClass("Desc")) {
		$(Element).removeClass("Desc");
		var ID = $(Element).attr('id').split("-");
		$.get("content/tables/table-" + Table.toLowerCase() + "/Get" + Table + "sInfo.php", {
			OrderBy: ID[1],
			Desc: 0,
			WhereID: WhereID
		}, CreateTable);
	} else {
		$(Element).addClass("Desc");
		var ID = $(Element).attr('id').split("-");
		$.get("content/tables/table-" + Table.toLowerCase() + "/Get" + Table + "sInfo.php", {
			OrderBy: ID[1],
			Desc: 1,
			WhereID: WhereID
		}, CreateTable);
	}
}
