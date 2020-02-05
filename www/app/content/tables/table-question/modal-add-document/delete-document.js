function onOpenDeleteDocument(e) {
	var Element = e.target;
	DeleteFileName = $(Element).closest("td").find(".ShowDocument").attr("id");
	var Name = $(Element).closest("tr").find(".Name");
	var ID = Name.attr('id').split("-");
	SelectedID = Number(ID[1]);
	$("#ModalNameDeleteDocument").text(Name.text());
}

$('#SubmitDeleteDocument').click(function () {
	$.get("content/tables/table-question/modal-add-document/delete-document.php", {
		DeleteFileName: DeleteFileName,
	});
	$.get("content/tables/table-question/modal-add-document/UpdateFileName.php", {
		Name: "",
		ID: SelectedID,
	}, onDeleteDocumentName);
});

function onDeleteDocumentName(data) {
	var Data = JSON.parse(data);
	var ID = Data[0][0];
	$("#Row-" + ID).find(".ShowDocument").attr("id", "");
	$('#Row-' + SelectedID).find(".ShowDocument").addClass("d-none");
	$('#Row-' + SelectedID).find(".DeleteDocument").addClass("d-none");
	$.mSnackbar('Документ удален');
}
