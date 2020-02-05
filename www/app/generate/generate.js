function onOpenGenerate() {
	$.get("generate/GetSubjectList.php", {
			ID: TeacherID
		},
		onGetSubject);

	$.get("generate/GetTypeList.php", {},
		onGetTypeList);
}

function onGetSubject(data) {
	var Data = JSON.parse(data);
	$("#GenerateForm-Subject").empty();
	for (var i = 0; i < Data.length; i++) {
		var ID = Data[i][0];
		var Name = Data[i][1];
		$("#GenerateForm-Subject").append("<option id='GenerateSubject-" + ID + "'>" + Name + "</option>");
	}
}

function onGetTypeList(data) {
	var Data = JSON.parse(data);
	$(".InputTypeGroup").empty();
	for (var i = 0; i < Data.length; i++) {
		var ID = Data[i][0];
		var Name = Data[i][1];
		$(".InputTypeGroup").append('<div class="md-form mt-0"> <input type="number" id="GenerateType-' + ID + '" class="form-control GenerateType" min="0" max="1000"> <label>' + Name + '</label></div>');
	}
}

function onSubmitGenerate() {
	if ($('#GenerateForm-CardCount').val() != "") {

		$.cookie('GenerateSubject',
			$("#GenerateForm-Subject option:selected").attr("id").split("-")[1], {
				expires: 5,
				path: '/',
			});

		$.cookie('GenerateCardCount',
			$("#GenerateForm-CardCount").val(), {
				expires: 5,
				path: '/',
			});

		$(".GenerateType").each(function (index, element) {
			var CookieName = 'GenerateType-' + index;
			var CookieValue = {
				"index": $(element).attr('id').split('-')[1],
				"name": $(element).siblings('label').text(),
				"count": $(element).val()
			};
			$.cookie(CookieName,
				JSON.stringify(CookieValue), {
					expires: 5,
					path: '/',
				});
		});

		window.open("http://generator/www/app/cards/cards.html");
	} else {
		$.mSnackbar('Введите общее количество билетов');
	}
}
