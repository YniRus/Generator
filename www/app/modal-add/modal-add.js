function onOpenAdd() {

}

$('#SubmitAdd').click(function () {
	var WhereID;
	if (Table == "Subject") {
		WhereID = TeacherID;
	}
	if (Table == "Theme") {
		WhereID = SubjectID;
	}
	if (Table == "Question") {
		WhereID = ThemeID;
	}

	var Name = $("#ModalNameAdd").val();
	if (Name != "") {
		$("#AddName").val("");
		if (Table == "Question") {
			$.get("modal-add/AddQuestion.php", {
				SubjectID: SubjectID,
				ThemeID: ThemeID,
				Type: "Теоретический",
				Name: Name,
				Document: null
			}, onAdd);
		} else {
			$.get("modal-add/Add" + Table + ".php", {
				ID: WhereID,
				Name: Name
			}, onAdd);
		}
	} else {
		$.mSnackbar('Введите название');
	}
});

function onAdd(data) {
	var Data = JSON.parse(data);
	if (Table == "Question") {
		var ID = Data[0][0];
		var Type = Data[0][1];
		var Name = Data[0][2];
		var Document = Data[0][3];
		Row(ID, Name, Type, Document);

	} else {
		var ID = Data[0][0];
		var Name = Data[0][1];
		Row(ID, Name, 0, 0);
	}
	$.mSnackbar('Запись добавлена');
	$("#ModalNameAdd").val(null).blur();
}
