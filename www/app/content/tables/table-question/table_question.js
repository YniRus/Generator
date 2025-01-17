Vue.component('table-question', {
    template: '#table_question_template',
    data : function() {
        return {
            questions : [],
            searchString : '',
            document : null // Документ для показа в модальном окне
        };
    },
    props : ['parent'],
    computed : {
        activeMode : function () {
            return this.$eventBus.activeMode;
        }
    },
    watch : {
        searchString : function (val) {
            this.search(val);
        }
    },
    methods : {
        listeners : function() {
            this.$eventBus.$on('get-questions-info',this.getQuestionsInfo);
        },
        getQuestionsInfo : async function ({OrderBy = 'ID_Question', Order = 'ASC', WhereID = '*', ForTests = '0'}) {
            try {
                let questions = await $.get("content/tables/table-question/GetQuestionsInfo.php", {
                    OrderBy: OrderBy,
                    Order: Order,
                    WhereID: WhereID,
                    ForTests : ForTests
                });

                questions = JSON.parse(questions);

                this.questions = questions;
            } catch (e) {
                this.questions = [];
            }
        },
        getQuestionTypes : async function() {
            let forTests = this.activeMode === 'tests' ? 1 : 0;
            try {
                let result = await $.get("content/tables/table-question/GetQuestionTypesInfo.php", {
                    forTests : forTests
                });
                this.questionTypes = JSON.parse(result);
            } catch (e) {
                this.questionTypes = [];
            }
        },
        addItem : function () {
            this.$eventBus.$emit('show-modal-add', {
                'table' : 'question',
                'parentId' : this.parent.id
            })
        },
        editItem : function(item) {
            this.$eventBus.$emit('show-modal-edit',{
                table : 'question',
                item : item
            });
        },
        editType : function(item) {
            if(this.activeMode === 'tests') {
                $.mSnackbar('Для тестовых вопросов изменить тип нельзя. Удалите и добавьте заново');
                return;
            }
            this.$eventBus.$emit('show-modal-edit-question-type',{
                item : item
            });
        },
        editAnswers : function(question) {
            this.$eventBus.$emit('show-answer-editor-form',question);
        },
        deleteItem : function (item) {
            this.$eventBus.$emit('show-modal-delete',{
                table : 'question',
                item : item
            });
        },
        showDocument : function(item) {
            $(this.$el).find('#ShowDocumentModal').modal('show');
            this.document = `res/question-documents/${item.Document}`;
        },
        addDocument : function(item) {
            this.$eventBus.$emit('show-modal-add-question-document',{
                item : item
            });
        },
        deleteDocument : function(item) {
            this.$eventBus.$emit('show-modal-delete-question-document',{
                item : item
            });
        },
        sort : function (OrderBy) {
            this.$eventBus.$emit('sort-active-table',{
                OrderBy : OrderBy
            });
        },
        search :function (text) {
            for (let index in this.questions) {
                if(this.questions[index].Name.indexOf(text) !== -1) {
                    this.questions[index].Hide = false;
                } else {
                    this.questions[index].Hide = true;
                }
            }
        }
    },
    mounted : function () {
        this.listeners();
    }
});