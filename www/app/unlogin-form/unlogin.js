function onOpenUnlogin(e) {

}

$('#SubmitUnlogin').click(function () {

	TeacherID = null;
	TeacherInfo = null;
	$('#NavbarUserName').text("");

	$.cookie('TeacherInfo', null, {
		expires: 5,
		path: '/',
	});

	$(".Register").removeClass("d-none");
	$(".Login").removeClass("d-none");
	$(".Unlogin").addClass("d-none");


	$.get("content/tables/table-subject/GetSubjectsInfo.php", {
		OrderBy: "ID",
		Desc: 0,
		WhereID: TeacherID
	}, CreateTable);
});
