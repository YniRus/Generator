Vue.component('modal-add-question-document', {
	template: '#modal_add_question_document',
	data : function() {
		return {
			item : null,
			file : null
		};
	},
	computed : {},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-add-question-document',this.show);
		},
		filenameChanged : function() {
			this.file = this.$refs.file.files[0];
		},
		show : function ({item = null}) {
			this.file = null;
			this.item = item;
			$(this.$el).modal('show');
		},
		submit : async function () {
			let formData = new FormData();
			formData.append('file', this.file);
			formData.append('id', this.item.ID_Question);
			formData.append('deleteFile', this.item.Document ? this.item.Document : "");

			try {
				let result = await $.ajax({
					url: "content/tables/table-question/documents/addDocument.php",
					type: "POST",
					data: formData,
					cache: false,
					contentType: false,
					processData: false
				});
				result = JSON.parse(result);
				if(result.success) {
					this.$eventBus.$emit('edit-item-complete');
					$.mSnackbar('Документ загружен');
				} else {
					$.mSnackbar('Ошибка');
				}
			} catch (e) {
				$.mSnackbar('Ошибка загрузки документа');
			}

			$(this.$el).modal('hide');
		}
	},
	mounted : function () {
		this.listeners();
	}
});