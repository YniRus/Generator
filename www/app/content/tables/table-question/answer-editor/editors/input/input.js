Vue.component('answer-editor-input', {
    template: '#answer_editor_input_template',
    props : ['answer'],
    methods : {
        validate : function () {
            let errors = [];
            // Валидация

            let answer = {...this.answer};

            if(!answer.text) {
                errors.push('Пустое поле с вопросом');
            }

            if(!answer.correct) {
                errors.push('Пустое поле с правильным ответом');
            }

            answer.correct = answer.correct.trim();

            if(!answer.correct) {
                errors.push('Пустое поле с правильным ответом');
            }

            return {
                error : errors.join(' | '),
                answer : answer
            };
        }
    }
});