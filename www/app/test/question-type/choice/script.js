Vue.component('question-type-choice', {
    template: '#question_type_choice_template',
    props : ['data'],
    data() {
      return {
          question : null
      }
    },
    watch : {
        data : function () {
            this.$forceUpdate();
            this.render();
        }
    },
    methods : {
        getResult : function () {
            clearInterval(this.question.timer);
            let correctCount = 0;
            let correct = 0;
            let uncorrect = 0;
            this.question.info.Answers.options.map(function (option) {
                if(option.correct) {
                    correctCount++;
                    if(option.checked) {
                        correct++;
                    }
                } else {
                    if(option.checked) {
                        uncorrect++;
                    }
                }
            });

            let _absCount = correct - uncorrect;
            if(_absCount < 0) {
                _absCount = 0;
            }

            let points = Number((_absCount/correctCount).toFixed(2));

            return {
                id : this.question.info.ID_Question,
                title : this.question.info.Answers.text,
                points : points,
                time : this.question.time
            };
        },
        render : function () {
            this.question = {...this.data};
            this.question.info.Answers.options = this.question.info.Answers.options.map(function (option) {
                option.checked = false;
                return option;
            });
            shuffle(this.question.info.Answers.options);
            this.question.timer = setInterval(() => (this.question.time++), 1000);
        }
    },
    mounted : function () {
        this.render();
    }
});