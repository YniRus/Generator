Vue.component('modal-delete-question-document', {
	template: '#modal_delete_question_document',
	data : function() {
		return {
			item : null
		};
	},
	computed : {},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-delete-question-document',this.show);
		},
		show : function ({item = null}) {
			this.item = item;
			$(this.$el).modal('show');
		},
		submit : async function () {
			try {
				let result = await $.get("content/tables/table-question/documents/deleteDocument.php",{
					filename : this.item.Document,
					id : this.item.ID_Question
				});
				result = JSON.parse(result);
				if(result.success) {
					this.$eventBus.$emit('edit-item-complete');
					$.mSnackbar('Документ удалён');
				}
			} catch (e) {
				$.mSnackbar('Ошибка удаления документа');
			}
		}
	},
	mounted : function () {
		this.listeners();
	}
});