Vue.component('vue-breadcrumb', {
    template: '#breadcrumb_template',
    props: ['parent','activeTable'],
    data() {
        return {
            parents : {}
        }
    },
    watch : {
        parent : function (val) {
            if(val.type) {
                switch (val.type) {
                    case 'teacher' : {
                        this.parents.subject = val;
                        break;
                    }
                    case 'subject' : {
                        this.parents.theme = val;
                        break;
                    }
                    case 'theme' : {
                        this.parents.question = val;
                        break;
                    }
                }
            }
        }
    },
    methods : {
        upTo : function (table) {
            this.$eventBus.$emit('open-table',{
                table : table,
                parent : this.parents[table]
            });
            delete this.parents[table];
        }
    }
});