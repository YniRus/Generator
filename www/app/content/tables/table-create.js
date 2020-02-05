function CreateTable(data) {
	$("[id^='Row-']").each(function (index, value) {
		$(this).remove();
	});
	if (Table == "Subject") {
		var TableName = "Table-" + Table;
		$("[id^=Table]").addClass("d-none");
		$("[id^=" + TableName + "]").removeClass("d-none");
		var Data = JSON.parse(data);
		for (var i = 0; i < Data.length; i++) {
			var ID = Data[i][0];
			var Name = Data[i][1];
			var CountTheme = Data[i][2];
			Row(ID, Name, CountTheme, 0);
		}
	}
	if (Table == "Theme") {
		var TableName = "Table-" + Table;
		$("[id^=Table]").addClass("d-none");
		$("[id^=" + TableName + "]").removeClass("d-none");
		var Data = JSON.parse(data);
		for (var i = 0; i < Data.length; i++) {
			var ID = Data[i][0];
			var Name = Data[i][1];
			var CountQuestion = Data[i][2];
			Row(ID, Name, 0, CountQuestion);
		}
	}
	if (Table == "Question") {
		var TableName = "Table-" + Table;
		$("[id^=Table]").addClass("d-none");
		$("[id^=" + TableName + "]").removeClass("d-none");
		var Data = JSON.parse(data);
		for (var i = 0; i < Data.length; i++) {
			var ID = Data[i][0];
			var Name = Data[i][1];
			var Type = Data[i][2];
			var Document = Data[i][3];
			Row(ID, Name, Type, Document);
		}
	}
}

function Row(ID, Name, Attr1, Attr2) {

	if (Table == "Subject") {
		var Clone = TemplateSubject.clone(true); //Клонируем строку-шаблон (со всеми обработчиками)
		Clone.removeClass("d-none");

		Clone.attr("id", "Row-" + ID);
		Clone.find("th").text(ID);
		Clone.find(".Name").attr("id", "Name-" + ID).text(Name);
		Clone.find(".CountTheme").attr("id", "CountTheme-" + ID).text(Attr1);
		Clone.appendTo($("#Table-Subject").find("tbody")); //Выводим на экран	
	}
	if (Table == "Theme") {
		var Clone = TemplateTheme.clone(true); //Клонируем строку-шаблон (со всеми обработчиками)
		Clone.removeClass("d-none");

		Clone.attr("id", "Row-" + ID);
		Clone.find("th").text(ID);
		Clone.find(".Name").attr("id", "Name-" + ID).text(Name);
		Clone.find(".CountQuestion").attr("id", "CountQuestion-" + ID).text(Attr2);
		Clone.appendTo($("#Table-Theme").find("tbody")); //Выводим на экран	
	}
	if (Table == "Question") {
		var Clone = TemplateQuestion.clone(true); //Клонируем строку-шаблон (со всеми обработчиками)
		Clone.removeClass("d-none");

		Clone.attr("id", "Row-" + ID);
		Clone.find("th").text(ID);
		Clone.find(".Name").attr("id", "Name-" + ID).text(Name);
		Clone.find(".Type").attr("id", "Type-" + ID).text(Attr1);

		if (Attr2 != "") {
			Clone.find(".ShowDocument").attr("id", Attr2);
		} else {
			Clone.find(".ShowDocument").addClass("d-none");
			Clone.find(".DeleteDocument").addClass("d-none");
		}
		Clone.appendTo($("#Table-Question").find("tbody")); //Выводим на экран	
	}
}
