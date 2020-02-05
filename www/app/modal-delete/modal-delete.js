function onOpenDelete(e) {
	var Element = e.target;
	var Name = $(Element).closest("tr").find(".Name");
	var ID = Name.attr('id').split("-");
	SelectedID = Number(ID[1]);
	$("#ModalNameDelete").text(Name.text());
}

$('#SubmitDelete').click(function () {
	$.get("modal-delete/Delete" + Table + ".php", {
		ID: SelectedID,
	}, onDelete);
});

function onDelete(data) {
	var Data = JSON.parse(data);
	var ID = Data[0][0];
	$("#Row-" + ID).remove();
	$.mSnackbar('Запись удалена');
}
