Vue.component('modal-add', {
	template: '#modal_add_template',
	data : function() {
		return {
			table : null,
			parentId : null,
			title : null,
			// Добавление вопроса
			questionType : null,
			questionTypes : [],
			// Ответ на тест
			answer : null
		};
	},
	props : [],
	computed : {
		addMethodPath : function () {
			switch (this.table) {
				case 'subject' : return "modal-add/AddSubject.php";
				case 'theme' : return "modal-add/AddTheme.php";
				case 'question' : return "modal-add/AddQuestion.php";
				default : return null;
			}
		},
        activeMode : function () {
            return this.$eventBus.activeMode;
        }
	},
	watch : {
		questionType : function (val) {
			if(this.$eventBus.activeMode === 'tests' && this.questionTypes) {
				for (let index in this.questionTypes) {
					if(this.questionTypes[index].Name === this.questionType && this.questionTypes[index].Description) {
						this.title = this.questionTypes[index].Description;
						return;
					}
				}
			}
		}
	},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-add',this.show);
		},
		show : function ({table = null, parentId = null}) {
			this.table = table;
			this.parentId = parentId;
			$(this.$el).modal('show');

			if(this.table === 'question') {
				this.getQuestionTypes();
			}
		},
		getData : function() {
			switch (this.table) {
				case 'subject' : return {
					parentId : this.parentId,
					title : this.title
				};
				case 'theme' : return {
					parentId : this.parentId,
					title : this.title
				};
				case 'question' : return {
					parentId : this.parentId,
					title : this.title,
					type : this.questionType,
					document : null,
					answer : this.answer ? JSON.stringify(this.answer) : null
				};
				default : return {};
			}
		},
		getQuestionTypes : async function() {
			let forTests = this.activeMode === 'questions' ? 0 : 1;
			try {
				let result = await $.get("content/tables/table-question/GetQuestionTypesInfo.php", {
					forTests : forTests
				});
				this.questionTypes = JSON.parse(result);
				this.questionType = this.questionTypes[0].Name;
			} catch (e) {
				this.questionTypes = [];
			}
		},
		getAnswerData : function() {
			return this.$refs.answerEditor.returnAnswer();
		},
		submit : async function () {
			if(!this.title) {
				$.mSnackbar('Введите название');
				return ;
			}
			if(this.questionTypes  && !this.questionType) {
				// Загружены типы вопросов, но не выбран тип вопроса. Ошибка
				$.mSnackbar('Выберите тип вопроса');
				return ;
			}

			if(this.activeMode === 'tests') {
				let answerResponse = this.getAnswerData();
				if(!answerResponse) {
					$.mSnackbar('Пустой ответ на вопрос');
					return ;
				}
				if(answerResponse.error) {
					$.mSnackbar(answerResponse.error);
					return ;
				}

				if(answerResponse.answer) {
					this.answer = answerResponse.answer;
				} else {
					$.mSnackbar('Пустые данные ответа');
					return ;
				}
			}

			try {
				let result = await $.get(this.addMethodPath, this.getData());
				result = JSON.parse(result);
				if(result) {
					this.$eventBus.$emit('add-item-complete');
					$(this.$el).modal('hide');
				}
			} catch (e) {
				$.mSnackbar('Ошибка добавления записи');
			}
		}
	},
	mounted : function () {
		this.listeners();
	}
});