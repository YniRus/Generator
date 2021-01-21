Vue.component('modal-edit', {
	template: '#modal_edit_template',
	data : function() {
		return {
			'table' : null,
			'item' : null,
			'newName' : null
		};
	},
	watch : {
		item : function (item) {
			if(item) {
				this.newName = this.itemName;
			}
		}
	},
	computed : {
		editMethodPath : function () {
			switch (this.table) {
				case 'subject' : return "modal-update/UpdateSubjectName.php";
				case 'theme' : return "modal-update/UpdateThemeName.php";
				case 'question' : return "modal-update/UpdateQuestionName.php";
				default : return null;
			}
		},
		itemId : function () {
			try {
				switch (this.table) {
					case 'subject' : return  this.item.ID_Subject;
					case 'theme' : return this.item.ID_Theme;
					case 'question' : return this.item.ID_Question;
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
					default : return null;
				}
			} catch (e) {
				return null;
			}
		}
	},
	methods : {
		listeners : function() {
			this.$eventBus.$on('show-modal-edit',this.show);
		},
		show : function ({table = null, item = null}) {
			this.table = table;
			this.item = item;
			$(this.$el).modal('show');
			$(this.$el).on('shown.bs.modal', () => {
				$(this.$el).find('input').focus().trigger('change');
			});
		},
		submit : async function () {
			if(!this.newName) {
				$.mSnackbar('Введите название');
				return false;
			}
			try {
				let result = await $.get(this.editMethodPath, {
					ID : this.itemId,
					Name : this.newName
				});
				result = JSON.parse(result);
				if(result.Name) {
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