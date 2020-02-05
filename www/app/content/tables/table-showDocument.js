function ShowDocument(e) {
	var Element = e.target;
	var Name = $(Element).closest("td").find(".ShowDocument").attr("id");
	var Image = $("#ShowDocumentModal").find("img")[0];
	$(Image).attr("src", "res/question-documents/" + Name);
}
