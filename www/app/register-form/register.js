Vue.component('register-form', {
	template: '#register_form_template',
	data() {
		return {
			universitiesList: [],
			departmentsList: [],
			university:null,
			department:null,
			fio: null,
			login: null,
			password: null
		}
	},
	watch: {
		university: function (val) {
			this.loadDepartments();
		}
	},
	methods: {
		setSelectData : function(data,list,property) {
			let Data = JSON.parse(data);
			for (let i = 0; i < Data.length; i++) {
				this[list].push({
					value : Data[i][0], //ID
					text : Data[i][1] //Name
				});
				if(!this[property]) {
					this[property] = Data[i][0];
				}
			}
		},
		loadUniversities: async function () {
			if(this.universitiesList.length === 0) {
				let data = await $.get("register-form/GetUniversityInfo.php", {});
				this.setSelectData(data,'universitiesList','university');
			}
		},
		loadDepartments: async function () {
			let data = await $.get("register-form/GetDepartmentInfo.php", {ID: this.university});
			this.setSelectData(data,'departmentsList','department');
		},
		submitRegister: async function () {
			let registerInfo = await $.get("register-form/AddTeacher.php", {
				ID_University: this.university,
				ID_Department: this.department,
				FIO: this.fio,
				Login: this.login,
				Password: this.password,
			});

			if (registerInfo == "[]") {
				$.mSnackbar('Ошибка регистрации! Возможно данный Логин занят.');
			} else {
				let Data = JSON.parse(registerInfo);
				let TeacherInfo = Data[0];
				$.cookie('TeacherInfo', JSON.stringify(TeacherInfo), {
					expires: 5,
					path: '/',
				});

				this.$eventBus.$emit('update-teacher-info', TeacherInfo);
				$.mSnackbar('Успешная регистрация в системе!');
			}
		}
	},
	mounted : function () {
		$("#ModalRegister").on('show.bs.modal',this.loadUniversities);
	}
});