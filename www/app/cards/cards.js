var QuestionType = [];
var Question = [];
var ThemeUse = [];
var CardCount = Number($.cookie('GenerateCardCount'));
var SubjectID = $.cookie('GenerateSubject');

var main = function () {

	//Получаем кол-во вопросов каждого типа
	var i = 0;
	while ($.cookie('GenerateType-' + i)) {
		QuestionType[i] = JSON.parse($.cookie('GenerateType-' + i));
		i++;
	}

	//Размножаем билеты
	for (var i = 1; i < CardCount + 1; i++) {
		var Clone = $('.CardTemplate').clone(false);
		Clone.removeClass('d-none CardTemplate');
		Clone.addClass('Card-' + i);
		Clone.find('.CardTitle').text("Билет №" + i);
		Clone.appendTo('.container-fluid');

		Clone = Clone.find('.Questions');
		Clone.html("");
		for (var j = 0; j < QuestionType.length; j++) {
			Clone.append('<label class="QuestionsType font-weight-bold"> Вопросы типа "' + QuestionType[j]["name"] + '"</label>');
			for (var n = 1; n < Number(QuestionType[j]["count"]) + 1; n++) {
				//Текст
				Clone.append('<p class="px-4 NoSet QuestionText QuestionsType-' + QuestionType[j]["index"] + '">' + n + ') ... </p>');
				//Изображение
				Clone.append('<div class="px-4"> </div>');
			}

		}
	}

	$.get("GetSubjectInfo.php", {
			ID: SubjectID
		},
		onGetSubject);

	$(".FooterMessage").text('Автоматизированный генератор экзаменационных билетов© 2018 ПГУ');
}

function onGetSubject(data) {
	var Data = JSON.parse(data)[0];

	$(".University").text(Data[2]);
	$(".Department").text(Data[3]);

	$.get("GetQuestionInfo.php", {
			ID: SubjectID
		},
		onGetQuestion);
}

function onGetQuestion(data) {
	var Data = JSON.parse(data);

	for (var i = 0; i < Data.length; i++) {
		Question[i] = [];
		Question[i]['name'] = Data[i][0];
		Question[i]['type'] = Data[i][1];
		Question[i]['theme'] = Data[i][2];
		Question[i]['document'] = Data[i][3];

		ThemeUse[Question[i]['theme']] = [];
		$.each(QuestionType, function (index, item) {
			ThemeUse[Question[i]['theme']][item.index] = 0;
		});
	}

	SetQuestion();
}

function SetQuestion() {

	var imageToLoad = [];

	for (var i = 1; i < CardCount + 1; i++) {
		for (var j = 0; j < QuestionType.length; j++) {
			for (var n = 1; n < Number(QuestionType[j]["count"]) + 1; n++) {

				var ThemeID = GetTheme(QuestionType[j]["index"]);

				var QuestionID = GetRandomQuestion({
					"type": QuestionType[j]["index"],
					"theme": ThemeID
				});

				if (QuestionID !== undefined) {
					var Find = $(".Card-" + i).find(".Questions");
					Find = Find.find(".QuestionsType-" + QuestionType[j]["index"]).filter(".NoSet").first();
					//Find = Find.text(Question[QuestionID]["name"] + "Тип:" + Question[QuestionID]["type"] + "Тема:" + Question[QuestionID]["theme"]);
					Find = Find.text(n + ') ' + Question[QuestionID]["name"]);

					if (Question[QuestionID]["document"] != "") {
						Find.next().html("<img src='../res/question-documents/" + Question[QuestionID]["document"] + "' class='QuestionImage'>");
						imageToLoad.push('../res/question-documents/' + Question[QuestionID]["document"]);
					}

					Find = Find.removeClass("NoSet");
					ThemeUse[Question[QuestionID]["theme"]][QuestionType[j]["index"]]++;
				} else {
					var Find = $(".Card-" + i).find(".Questions");
					Find = Find.find(".QuestionsType-" + QuestionType[j]["index"]).filter(".NoSet").first();
					//Find = Find.text(Question[QuestionID]["name"] + "Тип:" + Question[QuestionID]["type"] + "Тема:" + Question[QuestionID]["theme"]);
					Find = Find.text(n + ') Вопрос данного типа не был найден');

					Find = Find.removeClass("NoSet");
					ThemeUse[ThemeID][QuestionType[j]["index"]]++;
				}
			}
		}
	}

	//Пример
	var z = loadResources(imageToLoad, function () {
		//alert("Все ресурсы загружены!");
		SetCardsToLists();
	});
}

function loadResources(arr, func) { //функция загрузки внешних ресурсов arr - массив ссылок, func - функция которая вызовется после загрузки всех ресурсов
	var loadStatus = false;
	loadStatus = {
		count: arr.length,
		loaded: 0,
		percent: 0
	}; //count - общее количество ресурсов, loaded - сколько загружено ресурсов, percent сколько загружено в процентах
	for (var i = 0; i < arr.length; i++) {
		var tmp = new Image();
		tmp.src = arr[i];
		tmp.onload = function () {
			loadStatus.loaded++;
			loadStatus.percent = (loadStatus.loaded * 100) / loadStatus.count;
			if (loadStatus.loaded >= loadStatus.count)
				func();
		}
	}
	return loadStatus;
}

function GetTheme(TypeID) {
	var Min = Number.MAX_SAFE_INTEGER;
	var Min_Index = -1;
	ThemeUse.forEach(function (theme, i, ThemeUse) {
		if (theme[TypeID] < Min) {
			Min = theme[TypeID];
			Min_Index = i;
		}
	});

	return Min_Index;
}

function GetRandomQuestion(param) {

	var tmpArray = [];
	var tmpIndex = 0;

	for (var i = 0; i < Question.length; i++) {
		if (Question[i]["type"] == param["type"] && Question[i]["theme"] == param["theme"]) {
			tmpArray[tmpIndex] = i;
			tmpIndex++;
		}
	}

	if (tmpArray.length == 0) {
		for (var i = 0; i < Question.length; i++) {
			if (Question[i]["type"] == param["type"]) {
				tmpArray[tmpIndex] = i;
				tmpIndex++;
			}
		}
	}

	var randIndex = Math.floor(Math.random() * tmpArray.length);

	return tmpArray[randIndex];
}

function SetCardsToLists() {
	var Compact = true;

	if (!Compact) {
		//По одному вопросу на лист
		var Find = $(".Card:not(.CardTemplate)").wrap("<div class='List'></div>");
	} else {

		$(".Card:not(.CardTemplate)").wrap("<div class='List'></div>");

		var Find = $(".Card:not(.CardTemplate)");

		var totalHeight = 0;

		var listHeight = $(".List").height();

		var CardToList = [];

		Find.each(function (index, card) {
			var cardHeight = $(card).outerHeight(true);
			console.log(index + " height= " + cardHeight);
			$(card).unwrap();
			if (totalHeight + cardHeight < listHeight) {
				totalHeight += cardHeight;
				CardToList.push(card);
			} else {
				$(CardToList).wrapAll("<div class='List'></div>");
				CardToList = [];
				totalHeight = cardHeight;
				CardToList.push(card);
			}
			//console.log(totalHeight);
		});

		$(CardToList).wrapAll("<div class='List'></div>");
	}
}

$(document).ready(main);
