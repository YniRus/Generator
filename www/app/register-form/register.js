function onOpenRegister(e) {
	$.get("register-form/GetUniversityInfo.php", {},
		onGetUniversity);
}

function onGetUniversity(data) {
	var Data = JSON.parse(data);
	$("#RegisterForm-University").empty();
	for (var i = 0; i < Data.length; i++) {
		var ID = Data[i][0];
		var Name = Data[i][1];
		$("#RegisterForm-University").append("<option id='RegisterUniversity-" + ID + "'>" + Name + "</option>");
	}

	$.get("register-form/GetDepartmentInfo.php", {
		ID: $("#RegisterForm-University option:selected").attr("id").split("-")[1],
	}, onGetDepartment);
}

function onGetDepartment(data) {
	var Data = JSON.parse(data);
	$("#RegisterForm-Department").empty();
	for (var i = 0; i < Data.length; i++) {
		var ID = Data[i][0];
		var Name = Data[i][1];
		$("#RegisterForm-Department").append("<option id='RegisterDepartment-" + ID + "'>" + Name + "</option>");
	}
}

$('#SubmitRegister').click(function () {
	$.get("register-form/AddTeacher.php", {
		ID_University: $("#RegisterForm-University option:selected").attr("id").split("-")[1],
		ID_Department: $("#RegisterForm-University option:selected").attr("id").split("-")[1],
		FIO: $("#RegisterForm-FIO").val(),
		Login: $("#RegisterForm-Login").val(),
		Password: $("#RegisterForm-Password").val(),
	}, onRegister);
});

function onRegister(data) {
	if (data == "[]") {
		$.mSnackbar('Ошибка регистрации! Возможно данный Логин занят.');

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

		$.mSnackbar('Успешная регистрация в системе!');

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
