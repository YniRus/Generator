Vue.component('generate-cards-form', {
	template: '#generate_cards_form_template',
	data() {
		return {
			subjectsList : [],
			typesList : [],
			subject : null,
			count : null,
		}
	},
	props : ['teacher'],
	methods: {
		loadData: async function () {
			try {
				let subjects = await $.get("content/tables/table-subject/GetSubjectsInfo.php", {
					WhereID : this.teacher.ID_Teacher,
					Order : 'ASC',
					OrderBy : 'Name'
				});
				this.subjectsList = JSON.parse(subjects);
			} catch (e) {
				this.subjectsList = [];
			}

			try {
				let types = await $.get("content/tables/table-question/GetQuestionTypesInfo.php", {
					forTests : 0
				});
				types = JSON.parse(types);
				types = types.map(function (value, index, array) {
					value.count = 0;
					return value;
				});
				this.typesList = types;
			} catch (e) {
				this.typesList = [];
			}
		},
		submit: function () {
			if (this.count) {

				$.cookie('GenerateSubject', this.subject, {
					expires: 5,
					path: '/',
				});

				$.cookie('GenerateCardCount', this.count, {
					expires: 5,
					path: '/',
				});

				for (let index in this.typesList) {
					let type = this.typesList[index];
					var CookieName = 'GenerateType-' + index;
					var CookieValue = {
						"index": type.ID_Type,
						"name": type.Name,
						"count": type.count
					};
					$.cookie(CookieName,
						JSON.stringify(CookieValue), {
							expires: 5,
							path: '/',
						});
				};

				window.open("http://generator/www/app/cards/cards.html");
			} else {
				$.mSnackbar('Введите общее количество билетов');
			}
		}
	},
	mounted : function () {
		$("#ModalGenerate").on('show.bs.modal',this.loadData);
	}
});