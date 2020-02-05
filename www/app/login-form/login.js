Vue.component('login-form', {
    template: '#login_form_template',
    data() {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        logIn: function () {
            $.get("login-form/LoginTeacher.php", {
                Login: this.login,
                Password: this.password,
            }, this.onLogin);
        },
        onLogin: function (data) {
            if (data == "[]") {
                $.mSnackbar('Ошибка авторизации! Проверьте логин и пароль.');
            } else {
                let Data = JSON.parse(data);
                let TeacherInfo = Data[0];
                $.cookie('TeacherInfo', JSON.stringify(TeacherInfo), {
                    expires: 5,
                    path: '/',
                });

                this.$eventBus.$emit('update-teacher-info',TeacherInfo);
                $.mSnackbar('Успешный вход в систему!');
            }
        }
    }
});