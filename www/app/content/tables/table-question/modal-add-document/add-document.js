var DeleteFileName = "";
var NewFileName = "";

function onAddDocumentModal(e) {
	var Element = e.target;
	DeleteFileName = $(Element).closest("td").find(".ShowDocument").attr("id");
	var Name = $(Element).closest("tr").find(".Name");
	var ID = Name.attr('id').split("-");
	SelectedID = Number(ID[1]);
}

$("form[name='uploader']").submit(function (e) {
	var formData = new FormData($(this)[0]);

	NewFileName = $("#InputFile").val().split("\\");

	NewFileName = NewFileName[NewFileName.length - 1];

	if (DeleteFileName != "") {
		//Запрос на удаление данных с сервера
		$.get("content/tables/table-question/modal-add-document/delete-document.php", {
			DeleteFileName: DeleteFileName,
		});
	}

	if (NewFileName != "") {
		//Запрос на добавление данных на сервер
		$.ajax({
			url: 'content/tables/table-question/modal-add-document/add-document.php',
			type: "POST",
			data: formData,
			async: false,
			success: function (msg) {
				$('#Row-' + SelectedID).find(".ShowDocument").attr("id", NewFileName);
				$('#Row-' + SelectedID).find(".ShowDocument").removeClass("d-none");
				$('#Row-' + SelectedID).find(".DeleteDocument").removeClass("d-none");

				$('#AddDocumentModal').modal('hide');
				$.mSnackbar(msg);
			},
			error: function (msg) {
				$('#AddDocumentModal').modal('hide');
				$.mSnackbar(msg);
			},
			cache: false,
			contentType: false,
			processData: false
		});


		//Запрос на обновление данных в БД
		$.get("content/tables/table-question/modal-add-document/UpdateFileName.php", {
			Name: NewFileName,
			ID: SelectedID,
		}, onUpdateDocumentName);
	} else {
		$.mSnackbar("Выберите файл для загрузки");
	}
	e.preventDefault();
});


function onUpdateDocumentName(data) {
	var Data = JSON.parse(data);
}
