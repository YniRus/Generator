Vue.component('answer-editor-choice', {
    template: '#answer_editor_choice_template',
    props : ['answer'],
    watch : {
        answer : function () {
            this.optionEdited();
        }
    },
    methods : {
        optionEdited : function () {
            let lastIndex = this.answer.options.length - 1;
            if(this.answer.options[lastIndex] && this.answer.options[lastIndex].text) {
                this.answer.options.push({
                    text : null,
                    correct : false
                });
            }
            let prelastIndex = lastIndex - 1;
            if(this.answer.options[prelastIndex] && !this.answer.options[prelastIndex].text) {
                this.answer.options.pop();
                this.optionEdited();
            }
        },
        validate : function () {
            let errors = [];
            // Валидация

            if(!this.answer.text) {
                errors.push('Пустое поле с вопросом');
            }

            let answer = {...this.answer};

            let options = answer.options;
            let lastIndex = options.length - 1;
            if(options[lastIndex] && !options[lastIndex].text) {
                options.pop();
            }

            if(options.length < 2) {
                errors.push('Слишком мало вариантов ответа');
            }

            let totalCount = options.length;
            let correctCount = 0;
            let uncorrectCount = 0;
            let withoutTitle = 0;
            for (let option of options) {
                if(option.correct) {
                    correctCount++;
                } else {
                    uncorrectCount++;
                }
                if(!option.title) {
                    withoutTitle++;
                }
            }

            if(correctCount === totalCount) {
                errors.push('Все ответы не могу быть правильными');
            }

            if(uncorrectCount === totalCount) {
                errors.push('Добавьте хотя-бы один правильный ответ');
            }

            if(uncorrectCount === totalCount) {
                errors.push('Не у всех ответов заполнен заголовок');
            }

            return {
                error : errors.join(' | '),
                answer : answer
            };
        }
    },
    mounted : function () {
        this.$eventBus.$once('validate-answer-editor-data',this.validate);
    }
});