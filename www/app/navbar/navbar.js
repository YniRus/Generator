Vue.component('vue-navbar', {
    template: '#navbar_template',
    props: ['teacherInfo'],
    data() {
        return {
            activeMode : 'questions',
            brandQuestions : {},
            brandTests : {}
        }
    },
    methods : {
        saveActiveMode : function (value) {
            $.cookie('activeMode', value, {expires: 5, path: '/'});
        },
        toggleTo : function (value) {
            if(value === 'questions') {
                this.brandQuestions = {
                    'padding-top': '22px',
                    'padding-bottom': '5px'
                };
                this.brandTests = {};
            } else {
                this.brandTests = {
                    top: '-16px'
                };
                this.brandQuestions = {};
            }
        },
        toggleToActive : function () {
            this.toggleTo(this.activeMode);
        }
    },
    mounted : function () {
        this.activeMode = this.$eventBus.activeMode;
        this.saveActiveMode(this.activeMode);
        this.toggleToActive();
    }
});