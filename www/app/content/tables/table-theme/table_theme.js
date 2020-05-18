Vue.component('table-theme', {
    template: '#table_theme_template',
    data : function() {
        return {
            themes : [],
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
            this.$eventBus.$on('get-themes-info',this.getThemesInfo);
        },
        getThemesInfo : async function ({OrderBy = 'ID_Theme', Order = 'ASC', WhereID = '*', CountForTests = '0'}) {
            try {
                let themes = await $.get("content/tables/table-theme/GetThemesInfo.php", {
                    OrderBy: OrderBy,
                    Order: Order,
                    WhereID: WhereID,
                    CountForTests : CountForTests
                });

                themes = JSON.parse(themes);

                this.themes = themes;
            } catch (e) {
                this.themes = [];
            }
        },
        addItem : function () {
            this.$eventBus.$emit('show-modal-add', {
                'table' : 'theme',
                'parentId' : this.parent.id
            })
        },
        editItem : function(item) {
            this.$eventBus.$emit('show-modal-edit',{
                table : 'theme',
                item : item
            });
        },
        deleteItem : function (item) {
            this.$eventBus.$emit('show-modal-delete',{
                table : 'theme',
                item : item
            });
        },
        sort : function (OrderBy) {
            this.$eventBus.$emit('sort-active-table',{
                OrderBy : OrderBy
            });
        },
        search :function (text) {
            for (let index in this.themes) {
                if(this.themes[index].ThemeName.indexOf(text) !== -1) {
                    this.themes[index].Hide = false;
                } else {
                    this.themes[index].Hide = true;
                }
            }
        },
        subtable : function (table, parent) {
            this.$eventBus.$emit('open-table',{
                table : table,
                parent : {
                    type : 'theme',
                    id : parent.ID_Theme,
                    data : parent
                }
            });
        }
    },
    mounted : function () {
        this.listeners();
    }
});