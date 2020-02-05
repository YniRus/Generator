Vue.component('unlogin-form', {
	template: '#unlogin_form_template',
	data() {
		return {}
	},
	methods: {
		unLogin: function () {
			$.cookie('TeacherInfo', null, {
				expires: 5,
				path: '/',
			});

			this.$eventBus.$emit('update-teacher-info',null);
		}
	}
});