Vue.component('modal-edit-question-type', {
	template: '#modal_edit_question_type',
	data : function() {
		return {
			item : null,
			questionTypes : [],
			type : null
		};
	},
	watch : {
		item : function (item) {
			if(item) {
				this.type = item.Type;
			}
		}
	},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-edit-question-type',this.show);
		},
		show : function ({item = null}) {
			this.item = item;
			$(this.$el).modal('show');
			this.getQuestionTypes();
		},
		getQuestionTypes : async function() {
			let activeMode = $.cookie('activeMode');
			let forTests = activeMode === 'questions' ? 0 : 1;
			try {
				let result = await $.get("content/tables/table-question/GetQuestionTypesInfo.php", {
					forTests : forTests
				});
				this.questionTypes = JSON.parse(result);
			} catch (e) {
				this.questionTypes = [];
			}
		},
		submit : async function () {
			try {
				let result = await $.get("content/tables/table-question/update-type/UpdateQuestionType.php", {
					id : this.item.ID_Question,
					type : this.type
				});
				result = JSON.parse(result);
				if(result.success) {
					this.$eventBus.$emit('edit-item-complete');
				}
			} catch (e) {
				$.mSnackbar('Ошибка обновления записи');
			}
		}
	},
	mounted : function () {
		this.listeners();
	}
});