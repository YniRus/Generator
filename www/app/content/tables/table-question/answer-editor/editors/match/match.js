Vue.component('answer-editor-match', {
    template: '#answer_editor_match_template',
    props : ['answer'],
    watch : {
        answer : function () {
            this.optionEdited();
        }
    },
    methods : {
        optionEdited : function () {
            let lastIndex = this.answer.options.length - 1;
            if(this.answer.options[lastIndex] && (this.answer.options[lastIndex].left || this.answer.options[lastIndex].right)) {
                this.answer.options.push({
                    id : uuidv4(),
                    left : null,
                    right : null
                });
            }
            let prelastIndex = lastIndex - 1;
            if(this.answer.options[prelastIndex] && !this.answer.options[prelastIndex].left && !this.answer.options[prelastIndex].right) {
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
                errors.push('Слишком мало вариантов сопоставления');
            }

            for (let option of options) {
                if(!option.left || !option.right) {
                    errors.push('В сопоставлении левая или правая часть пуста');
                    break;
                }
            }

            return {
                error : errors.join(' | '),
                answer : answer
            };
        }
    }
});