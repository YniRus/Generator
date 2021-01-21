Vue.component('modal-edit-test', {
    template: '#modal_edit_test_template',
    data() {
        return {
            teacher : null,
            test : null,
            subjectsList: [],
            themesList: [],
            id : null,
            subject : "",
            theme : "",
            title : null,
            time:null,
            question_count:null,
            difficult: null
        }
    },
    computed :{
        modalTitle : function () {
            if(this.test) {
                return 'Редактирование';
            } else {
                return 'Добавление';
            }
        }
    },
    watch: {
        subject: function () {
            this.loadThemes();
        }
    },
    methods: {
        show : function({teacher, test = null}) {
            this.teacher = teacher;
            this.test = test;
            if(this.test) {
                this.id = this.test.id;
                this.subject = this.test.subject_id;
                this.theme = this.test.theme_id;
                this.title = this.test.title;
                this.time = this.test.time;
                this.question_count = this.test.question_count;
                this.difficult = this.test.difficult;
            }
            // TODO При показе всё обнулять
            $(this.$el).modal('show');
            $(this.$el).on('shown.bs.modal', () => {
                $(this.$el).find('input').focus().trigger('change');
            });
            this.loadSubjects();
        },
        loadSubjects: async function () {
            if(this.subjectsList.length === 0) {
                let subjects = await $.get("content/tables/table-subject/GetSubjectsInfo.php", {
                    WhereID : this.teacher.id,
                    Order : 'ASC',
                    OrderBy : 'ID_Subject'
                });
                try {
                    this.subjectsList = JSON.parse(subjects);
                } catch (e) {
                    this.subjectsList = [];
                }
            }
        },
        loadThemes: async function () {
            let themes = await $.get("content/tables/table-theme/GetThemesInfo.php", {
                WhereID : this.subject,
                Order : 'ASC',
                OrderBy : 'ID_Theme'
            });
            try {
                this.themesList = JSON.parse(themes);
            } catch (e) {
                this.themesList = [];
            }
        },
        submit: async function () {
            let create = true;
            let result = null;

            let data = {
                teacher_id : this.teacher.id,
                subject_id : this.subject,
                theme_id : this.theme,
                title : this.title,
                time : this.time,
                question_count : this.question_count,
                difficult : this.difficult
            };

            // TODO : Сюда нужна валидация

            if(this.id) {
                // Редактирование
                data.id = this.id;
                create = false;
            }

            if(create) {
                result = await $.get("content/tables/table-tests/modal-edit-test/AddTest.php", data);
            } else {
                result = await $.get("content/tables/table-tests/modal-edit-test/UpdateTest.php", data);
            }

            try {
                result = JSON.parse(result);
                if(result && result.id) {
                    this.$eventBus.$emit('add-item-complete');
                    $(this.$el).modal('hide');
                }
            } catch (e) {
                $.mSnackbar('Ошибка добавления/редактирования записи');
            }
        }
    },
    mounted : function () {
        this.$eventBus.$on('show-modal-edit-test',this.show);
    }
});