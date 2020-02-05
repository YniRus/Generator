function onOpenLogin(e) {

}

$('#SubmitLogin').click(function () {

	var Login = $("#LoginForm-Login").val();
	var Password = $("#LoginForm-Password").val();

	$.get("login-form/LoginTeacher.php", {
		Login: $("#LoginForm-Login").val(),
		Password: $("#LoginForm-Password").val(),
	}, onLogin);
});

function onLogin(data) {
	if (data == "[]") {
		$.mSnackbar('Ошибка авторизации! Проверьте логин и пароль.');

		$(".Register").removeClass("d-none");
		$(".Login").removeClass("d-none");
		$(".Unlogin").addClass("d-none");
	} else {
		var Data = JSON.parse(data);

		TeacherInfo = Data[0];
		TeacherID = Data[0]['ID_Teacher'];
		$('#NavbarUserName').text(TeacherInfo['FIO']);

		$.cookie('TeacherInfo', JSON.stringify(TeacherInfo), {
			expires: 5,
			path: '/',
		});

		$.mSnackbar('Успешный вход в систему!');

		$(".Register").addClass("d-none");
		$(".Login").addClass("d-none");
		$(".Unlogin").removeClass("d-none");

		$(".navbar-nav").find('li').removeClass("d-none");
		$("#main-container").removeClass("d-none");
		$("#preview").addClass("d-none");

		$.get("content/tables/table-subject/GetSubjectsInfo.php", {
			OrderBy: "ID",
			Desc: 0,
			WhereID: TeacherID
		}, CreateTable);
	}
}
