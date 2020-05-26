Vue.component('question-type-input', {
    template: '#question_type_input_template',
    props : ['data'],
    data() {
        return {
            question : null,
            answer : ""
        }
    },
    methods : {
        getResult : function () {
            clearInterval(this.question.timer);
            let answer = this.answer.trim().toLowerCase();
            let correct = this.question.info.Answers.correct.trim().toLowerCase();

            let points = answer === correct ? 1 : 0;

            return {
                id : this.question.info.ID_Question,
                title : this.question.info.Answers.text,
                points : points,
                time : this.question.time
            };
        },
        render : function () {
            this.question = {...this.data};
            this.question.timer = setInterval(() => (this.question.time++), 1000);
        }
    },
    mounted : function () {
        this.render();
    }
});