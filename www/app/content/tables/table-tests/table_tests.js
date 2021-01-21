Vue.component('table-tests', {
    template: '#table_tests_template',
    data : function() {
        return {
            tests : [],
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
            this.$eventBus.$on('get-tests-info',this.getTestsInfo);
        },
        getTestsInfo : async function ({OrderBy = 'id', Order = 'ASC', WhereID = '*'}) {
            try {
                let tests = await $.get("content/tables/table-tests/GetTestsInfo.php", {
                    OrderBy: OrderBy,
                    Order: Order,
                    WhereID: WhereID
                });

                tests = JSON.parse(tests);

                this.tests = tests;
            } catch (e) {
                this.tests = [];
            }
        },
        isActive : function(item) {
            return this._Date(item.access_until) > new this._Date(item.now)
        },
        _Date : function (dateString) {
            let reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
                , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString);
            return new Date(year, month-1, day, hours, minutes, seconds);
        },
        addItem : function () {
            this.$eventBus.$emit('show-modal-edit-test', {
                teacher : this.parent,
                test : null
            })
        },
        editItem : function(item) {
            this.$eventBus.$emit('show-modal-edit-test', {
                teacher : this.parent,
                test : item
            })
        },
        deleteItem : function (item) {
            this.$eventBus.$emit('show-modal-delete',{
                table : 'tests',
                item : item
            });
        },
        sort : function (OrderBy) {
            this.$eventBus.$emit('sort-active-table',{
                OrderBy : OrderBy
            });
        },
        activate : async function(item) {
            try {
                let result = await $.get("content/tables/table-tests/ActivateTest.php", {
                    id : item.id
                });
                result = JSON.parse(result);
                if(result.success) {
                    this.$eventBus.$emit('edit-item-complete');
                }
            } catch (e) {
                $.mSnackbar('Ошибка');
            }
        },
        deactivate : async function(item) {
            try {
                let result = await $.get("content/tables/table-tests/DeactivateTest.php", {
                    id : item.id
                });
                result = JSON.parse(result);
                if(result.success) {
                    this.$eventBus.$emit('edit-item-complete');
                }
            } catch (e) {
                $.mSnackbar('Ошибка');
            }
        },
        logs : function(item) {
            window.open(`http://generator/www/app/res/test-logs/${item.log_dir}/`);
        },
        search :function (text) {
            for (let index in this.tests) {
                if(this.tests[index].title.indexOf(text) !== -1) {
                    this.tests[index].Hide = false;
                } else {
                    this.tests[index].Hide = true;
                }
            }
        }
    },
    mounted : function () {
        this.listeners();
    }
});