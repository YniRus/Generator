function log(value) {
	console.log(value);
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

let MainVueApp = new Vue({
	el : "#mainVueApp",
	data : {
		teacherInfo : {},
		activeTable : null,
		activeMode : null,
		orderBy : null,
		order: null,
		parent : {}
	},
	watch : {
		activeTable : function (val) {
			if(val === 'subject') {
				this.parent = {
					type : 'teacher',
					id : this.teacherId,
					data : this.teacherInfo
				};
				this.orderBy = 'ID_Subject';
				this.order = 'ASC';
			} else if (val === 'theme') {
				this.orderBy = 'ID_Theme';
				this.order = 'ASC';
			} else if (val === 'question') {
				this.orderBy = 'ID_Question';
				this.order = 'ASC';
			} else if (val === 'tests') {
				this.parent = {
					type : 'teacher',
					id : this.teacherId,
					data : this.teacherInfo
				};
				this.orderBy = 'id';
				this.order = 'ASC';
			}
			this.updateActiveTable();
		}
	},
	computed : {
		teacherId : function () {
			return this.teacherInfo ? this.teacherInfo['ID_Teacher'] : null;
		},
	},
	methods : {
		listeners : function() {
			this.$eventBus.$on('update-teacher-info',this.setTeacherInfo);
			this.$eventBus.$on('sort-active-table',this.sortActiveTable);
			this.$eventBus.$on('add-item-complete',this.updateActiveTable);
			this.$eventBus.$on('edit-item-complete',this.updateActiveTable);
			this.$eventBus.$on('delete-item-complete',this.updateActiveTable);
			this.$eventBus.$on('open-table',this.openTable);
		},
		initTeacherInfo: function () {
			TeacherInfo = $.cookie('TeacherInfo');
			this.setTeacherInfo(JSON.parse(TeacherInfo));
		},
		initActiveMode : function() {
			let activeMode = $.cookie('activeMode');
			if(['questions','tests'].indexOf(activeMode) !== -1) {
				this.activeMode = activeMode;
			}
			this.activeMode = this.activeMode ? this.activeMode : 'questions';
		},
		setTeacherInfo : function (teacherInfo) {
			this.teacherInfo = teacherInfo;
			if(this.teacherId !== null) {
				this.activeTable = 'subject';
			}
		},
		sortActiveTable : function({OrderBy = 'ID_Subject'}) {
			let Order = 'ASC';
			if(this.orderBy === OrderBy) {
				Order = this.order === 'ASC' ? 'DESC' : 'ASC';
			}
			this.orderBy = OrderBy;
			this.order = Order;
			this.updateActiveTable();
		},
		openTable : function({table,parent}) {
			this.activeTable = table;
			if(parent) {
				this.parent = parent;
			}
		},
		updateActiveTable : function() {
			switch (this.activeTable) {
				case "subject": return this.getSubjectsInfo();
				case "theme": return this.getThemesInfo();
				case "question": return this.getQuestionsInfo();
				case "tests": return this.getTestsInfo();
				default : return false;
			}
		},
		getSubjectsInfo : function () {
			this.$eventBus.$emit('get-subjects-info', {
				OrderBy: this.orderBy,
				Order: this.order,
				WhereID: this.parent.id
			})
		},
		getThemesInfo : function() {
			this.$eventBus.$emit('get-themes-info', {
				OrderBy: this.orderBy,
				Order: this.order,
				WhereID: this.parent.id,
				CountForTests : this.activeMode === 'tests' ? 1 : 0
			})
		},
		getQuestionsInfo : function() {
			this.$eventBus.$emit('get-questions-info', {
				OrderBy: this.orderBy,
				Order: this.order,
				WhereID: this.parent.id,
				ForTests : this.activeMode === 'tests' ? 1 : 0
			})
		},
		getTestsInfo : function () {
			this.$eventBus.$emit('get-tests-info', {
				OrderBy: this.orderBy,
				Order: this.order,
				WhereID: this.parent.id
			})
		},
	},
	mounted: function () {
		this.listeners();
		this.initTeacherInfo();
		this.initActiveMode();
	}
});

