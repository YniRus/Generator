Vue.component('run-test-form', {
    template: '#run_test_form_template',
    data() {
        return {
            universitiesList: [],
            departmentsList: [],
            teachersList : [],
            university:null,
            department:null,
            teacher : null,
            tests: [],
            activeTest : null,
            user : {
                name : null,
                group : null
            }
        }
    },
    computed : {
        allowSubmit : function () {
            if(this.activeTest && this.user.name && this.user.group) {
                return true;
            }
            return false;
        }
    },
    watch: {
        university: function () {
            this.loadDepartments();
        },
        department: function () {
            this.loadTeachers();
        },
        teacher: function () {
            this.activeTest = null;
            this.loadTests();
        }
    },
    methods: {
        setSelectData : function(data,list) {
            let Data = JSON.parse(data);
            for (let i = 0; i < Data.length; i++) {
                this[list].push({
                    value : Data[i][0], //ID
                    text : Data[i][1] //Name
                });
            }
        },
        loadUniversities: async function () {
            if(this.universitiesList.length === 0) {
                let data = await $.get("register-form/GetUniversityInfo.php", {});
                this.setSelectData(data,'universitiesList');
            }
        },
        loadDepartments: async function () {
            let data = await $.get("register-form/GetDepartmentInfo.php", {ID: this.university});
            this.setSelectData(data,'departmentsList');
        },
        loadTeachers: async function () {
            let data = await $.get("run-test-form/GetTeachersInfo.php", {
                university: this.university,
                department: this.department
            });
            this.setSelectData(data,'teachersList');
        },
        loadTests: async function () {
            try {
                let tests = await $.get("content/tables/table-tests/GetTestsInfo.php", {
                    WhereID : this.teacher,
                    IsActive : true,
                    Order : 'ASC',
                    OrderBy : 'id'
                });
                this.tests = JSON.parse(tests);
            } catch (e) {
                this.tests = [];
            }
        },
        submit: function () {
            let data = {
                test_id : this.activeTest,
                user_name : this.user.name,
                user_group : this.user.group
            };
            let query = $.param(data);
            window.open(`http://generator/www/app/test/test.shtml?${query}`);
        }
    },
    mounted : function () {
        $("#ModalRunTest").on('show.bs.modal',this.loadUniversities);
    }
});