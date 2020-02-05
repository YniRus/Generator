var SelectedID = 0; //ID выбранного объектра для отправки на сервер

var TeacherID, SubjectID, ThemeID;

var TemplateSubject, TemplateTheme, TemplateQuestion;

var Table = "Subject";

var TeacherInfo;

var SubjectName = "";

var main = function () {

	TeacherInfo = $.cookie('TeacherInfo');
	TeacherInfo = JSON.parse(TeacherInfo);

	if (TeacherInfo != null) {
		$('#NavbarUserName').text(TeacherInfo['FIO']);
		TeacherID = TeacherInfo['ID_Teacher'];
		$(".Register").addClass("d-none");
		$(".Login").addClass("d-none");
		$(".Unlogin").removeClass("d-none");
	} else {
		$(".Unlogin").addClass("d-none");
	}

	TemplateSubject = $(".TemplateSubject");
	TemplateTheme = $(".TemplateTheme");
	TemplateQuestion = $(".TemplateQuestion");

	if (TeacherInfo != null)
		$.get("content/tables/table-subject/GetSubjectsInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: TeacherID
		}, CreateTable);
	else {
		$(".navbar-nav").find('li').addClass("d-none");
		$("#main-container").addClass("d-none");
		$("#preview").removeClass("d-none");
	}

	$('.OpenUpdate').click(this, onOpenUpdate);

	$('.OpenDelete').click(this, onOpenDelete);

	$('.OpenAdd').click(onOpenAdd);

	$('.OpenDeleteDocument').click(this, onOpenDeleteDocument);

	$('.ShowTable').click(this, onEyeClick);

	$(".SortBy").click(this, SortByClick);

	$(".breadcrumb-item").click(this, ReturnUp);

	$("#Search").on('input', DoSearch);

	$(".ShowDocument").click(this, ShowDocument);

	$(".UpdateType").click(this, onOpenUpdateType);

	$(".AddDocument").click(this, onAddDocumentModal);

	$(".DeleteDocument").click(this, onOpenDeleteDocument);

	$(".Register").click(this, onOpenRegister);

	$("#OpenGenerate").click(onOpenGenerate);

	$("#SubmitGenerate").click(onSubmitGenerate);

}

$(document).ready(main);
