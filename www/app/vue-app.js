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
		},
		teacherId : function () {
			return this.teacherInfo ? this.teacherInfo['ID_Teacher'] : null;
		}
	},
	methods : {
		initTeacherInfo : function () {
			TeacherInfo = $.cookie('TeacherInfo');
			this.teacherInfo = JSON.parse(TeacherInfo);
		},
		setTeacherInfo : function (teacherInfo) {
			this.teacherInfo = teacherInfo;
			// $.get("content/tables/table-subject/GetSubjectsInfo.php", {
			// 	OrderBy: "ID",
			// 	Desc: 0,
			// 	WhereID: TeacherID
			// }, CreateTable);
		}
	},
	mounted: function () {
		this.initTeacherInfo();
		this.$eventBus.$on('update-teacher-info',this.setTeacherInfo);
	}
});

