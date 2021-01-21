Vue.component('modal-delete', {
	template: '#modal_delete_template',
	data : function() {
		return {
			'table' : null,
			'item' : null
		};
	},
	computed : {
		deleteMethodPath : function () {
			switch (this.table) {
				case 'subject' : return "modal-delete/DeleteSubject.php";
				case 'theme' : return "modal-delete/DeleteTheme.php";
				case 'question' : return "modal-delete/DeleteQuestion.php";
				case 'tests' : return "modal-delete/DeleteTest.php";
				default : return null;
			}
		},
		itemId : function () {
			try {
				switch (this.table) {
					case 'subject' : return  this.item.ID_Subject;
					case 'theme' : return this.item.ID_Theme;
					case 'question' : return this.item.ID_Question;
					case 'tests' : return this.item.id;
					default : return null;
				}
			} catch (e) {
				return null;
			}
		},
		itemName : function () {
			try {
				switch (this.table) {
					case 'subject' : return this.item.SubjectName;
					case 'theme' : return this.item.ThemeName;
					case 'question' : return this.item.Name;
					case 'tests' : return this.item.title;
					default : return null;
				}
			} catch (e) {
				return null;
			}
		}
	},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-delete',this.show);
		},
		show : function ({table = null, item = null}) {
			this.table = table;
			this.item = item;
			$(this.$el).modal('show');
		},
		submit : async function () {
			try {
				let result = await $.get(this.deleteMethodPath, {
					ID : this.itemId
				});
				result = JSON.parse(result);
				if(result.ID) {
					this.$eventBus.$emit('delete-item-complete');
				}
			} catch (e) {
				$.mSnackbar('Ошибка удаления записи');
			}
		}
	},
	mounted : function () {
		this.listeners();
	}
});