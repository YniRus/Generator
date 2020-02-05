function onOpenUpdateType(e) {
	var Element = e.target;
	var Name = $(Element).closest("tr").find(".Name");
	var ID = Name.attr('id').split("-");
	SelectedID = Number(ID[1]);

	$.get("content/tables/table-question/modal-update-type/GetTypeInfo.php", {}, onGetType);
}

$('#SubmitUpdateType').click(function () {
	var TypeName = $("#SelectType").val();
	if (TypeName != "") {
		$.get("content/tables/table-question/modal-update-type/UpdateQuestionType.php", {
			ID: SelectedID,
			Type: TypeName
		}, onUpdateType);
	} else {
		$.mSnackbar('Введите название');
	};
});

function onGetType(data) {
	var Data = JSON.parse(data);
	$("#SelectType").empty();
	for (var i = 0; i < Data.length; i++) {
		var ID = Data[i][0];
		var Name = Data[i][1];
		$("#SelectType").append("<option>" + Name + "</option>");
	}
}

function onUpdateType(data) {
	var Data = data.split(" ");
	var Ret = Data[0];
	if (Ret == true) {
		var ID = Data[1];
		var Name = Data[2];
		$("#Type-" + ID).text(Name);
		$.mSnackbar('Тип изменен');
	} else {
		$.mSnackbar('Произошла ошибка');
	}
}
