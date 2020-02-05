Vue.prototype.$eventBus = new Vue(); // Global event bus

class EntityTranslator {

	static getTableHeadText (entityAlias) {
		switch (entityAlias) {
			case 'subject' : {
				return "Список ваших предметов"
			}
			case 'theme' : {
				return "Список ваших предметов"
			}
			case 'question' : {
				return "Список ваших предметов"
			}
		}
	}

	static getAddButtonText (entityAlias) {
		switch (entityAlias) {
			case 'subject' : {
				return "Новый предмет"
			}
			case 'theme' : {
				return "Новая тема"
			}
			case 'question' : {
				return "Новый вопрос"
			}
		}
	}
}

let MainVueApp = new Vue({
	el : "#mainVueApp",
	data : {
		EntityTranslator : null,
		teacherInfo : {},
		activeTable : 'subject',
	},
	computed : {
		tableHeadText : function () {
			return EntityTranslator.getTableHeadText(this.activeTable);
		},
		addButtonText : function () {
			return EntityTranslator.getAddButtonText(this.activeTable);
		}
	},
	methods : {
		setTeacherInfo : function () {
			TeacherInfo = $.cookie('TeacherInfo');
			this.teacherInfo = JSON.parse(TeacherInfo);
		}
	},
	mounted: function () {
		this.setTeacherInfo();
	}
});

