Vue.component('answer-editor', {
    template: '#answer_editor_template',
    data : function() {
        return {
            answer : {},
            error : null
        };
    },
    props : ['data','type'],
    computed : {
        currentEditorComponent : function () {
            switch (this.type) {
                case 'Выбор' : return 'answer-editor-choice';
            }
        }
    },
    watch : {
        data : function (val) {
            if(typeof val.type !== 'undefined') {
                Vue.set(this,'answer',val);
            } else {
                Vue.set(this.answer,'type',this.type);
                this.initNewAnswerForm();
            }
        }
    },
    methods : {
        initNewAnswerForm : function() {
            switch (this.type) {
                case 'Выбор' : {
                    Vue.set(this.answer,'text',null);
                    Vue.set(this.answer,'options',[{
                        text : null,
                        correct : false
                    }]);
                }
            }
        },
        returnAnswer : function () {
            // Валидация
            let validatedData = this.$refs.editorComponent.validate();

            Vue.set(this,'error',validatedData.error);
            Vue.set(this,'answer',validatedData.answer);

            return {
                error : this.error,
                answer : this.answer
            };
        }
    }
});

Vue.component('answer-editor-form', {
    template: '#answer_editor_form_template',
    data : function() {
        return {
            id : null,
            answer : {},
            type : null
        };
    },
    methods : {
        show : function (question) {
            this.id = question.ID_Question;
            let answer = {};
            try {
                answer = JSON.parse(question.Answers);
            } catch (e) {}
            Vue.set(this,'answer',answer);
            Vue.set(this,'type',answer.type);
            $(this.$el).modal('show');
            $(this.$el).on('shown.bs.modal', () => {
                $(this.$el).find('input').focus().trigger('change');
            });
        },
        getAnswerData : function() {
            return this.$refs.answerEditor.returnAnswer();
        },
        submit : async function () {

            let answerResponse = this.getAnswerData();
            if(!answerResponse) {
                $.mSnackbar('Пустой ответ на вопрос');
                return ;
            }
            if(answerResponse.error) {
                $.mSnackbar(answerResponse.error);
                return ;
            }

            if(answerResponse.answer) {
                this.answer = answerResponse.answer;
            } else {
                $.mSnackbar('Пустые данные ответа');
                return ;
            }

            try {
                let result = await $.get("content/tables/table-question/answer-editor/UpdateQuestionAnswers.php", {
                    id : this.id,
                    answer : JSON.stringify(this.answer)
                });
                result = JSON.parse(result);
                if(result.success) {
                    this.$eventBus.$emit('edit-item-complete');
                    $(this.$el).modal('hide');
                }
            } catch (e) {
                $.mSnackbar('Ошибка обновления записи');
            }
        }
    },
    mounted : function () {
        this.$eventBus.$on('show-answer-editor-form',this.show);
    }
});