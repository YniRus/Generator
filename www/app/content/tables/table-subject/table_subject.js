Vue.component('table-subject', {
    template: '#table_subject_template',
    data : function() {
        return {
            subjects : [],
            searchString : ''
        };
    },
    props : ['parent'],
    watch : {
        searchString : function (val) {
            this.search(val);
        }
    },
    methods : {
        listeners : function() {
            this.$eventBus.$on('get-subjects-info',this.getSubjectsInfo);
        },
        getSubjectsInfo : async function ({OrderBy = 'ID_Subject', Order = 'ASC', WhereID = '*'}) {
            try {
                let subjects = await $.get("content/tables/table-subject/GetSubjectsInfo.php", {
                    OrderBy: OrderBy,
                    Order: Order,
                    WhereID: WhereID
                });

                subjects = JSON.parse(subjects);

                this.subjects = subjects;
            } catch (e) {
                this.subjects = [];
            }
        },
        addItem : function () {
            this.$eventBus.$emit('show-modal-add', {
                'table' : 'subject',
                'parentId' : this.parent.id
            })
        },
        editItem : function(item) {
            this.$eventBus.$emit('show-modal-edit',{
                table : 'subject',
                item : item
            });
        },
        deleteItem : function (item) {
            this.$eventBus.$emit('show-modal-delete',{
                table : 'subject',
                item : item
            });
        },
        sort : function (OrderBy) {
            this.$eventBus.$emit('sort-active-table',{
                OrderBy : OrderBy
            });
        },
        search :function (text) {
            for (let index in this.subjects) {
                if(this.subjects[index].SubjectName.indexOf(text) !== -1) {
                    this.subjects[index].Hide = false;
                } else {
                    this.subjects[index].Hide = true;
                }
            }
        },
        subtable : function (table, parent) {
            this.$eventBus.$emit('open-table',{
                table : table,
                parent : {
                    type : 'subject',
                    id : parent.ID_Subject,
                    data : parent
                }
            });
        }
    },
    mounted : function () {
        this.listeners();
    }
});