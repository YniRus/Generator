function onOpenUpdate(e) {
	var Element = e.target;
	var Name = $(Element).closest("tr").find(".Name");
	var ID = Name.attr('id').split("-");
	SelectedID = Number(ID[1]);
	$("#ModalNameUpdate").val(Name.text());
}

$('#SubmitUpdate').click(function () {
	var Name = $("#ModalNameUpdate").val();
	if (Name != "") {
		$.get("modal-update/Update" + Table + "Name.php", {
			ID: SelectedID,
			Name: Name
		}, onUpdate);
	} else {
		$.mSnackbar('Введите название');
	};
});

function onUpdate(data) {
	var Data = JSON.parse(data);
	var ID = Data[0][0];
	var Name = Data[0][1];
	$("#Name-" + ID).text(Name);
	$.mSnackbar('Название изменено');
}
