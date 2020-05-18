Vue.component('modal-add', {
	template: '#modal_add_template',
	data : function() {
		return {
			table : null,
			parentId : null,
			title : null,
			// Добавление вопроса
			questionType : null,
			questionTypes : []
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
					document : null
				};
				default : return {};
			}
		},
		getQuestionTypes : async function() {
			let activeMode = $.cookie('activeMode');
			let forTests = activeMode === 'questions' ? 0 : 1;
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
			try {
				let result = await $.get(this.addMethodPath, this.getData());
				result = JSON.parse(result);
				if(result) {
					this.$eventBus.$emit('add-item-complete');
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