Vue.component('question-type-match', {
    template: '#question_type_match_template',
    props : ['data'],
    data() {
      return {
          question : null,
          options : {
              left : [],
              right : []
          },
          answer : [],
          targetLeft : null,
          targetRight : null
      }
    },
    watch : {
        data : function () {
            this.render();
        }
    },
    methods : {
        getResult : function () {
            clearInterval(this.question.timer);
            let total = this.question.info.Answers.options.length;
            let correct = 0;
            this.answer.map(function (item) {
                if(item.left.id === item.right.id) {
                    correct++;
                }
            });

            let points = Number((correct/total).toFixed(2));

            return {
                id : this.question.info.ID_Question,
                title : this.question.info.Answers.text,
                points : points,
                time : this.question.time
            };
        },
        cleanup : function() {
            this.answer = [];
            this.targetLeft = null;
            this.targetRight = null;
            this.options = {
                left : [],
                right : []
            };
        },
        render : function() {
            this.question = {...this.data};
            this.question.info.Answers.options.map((option) => {
                this.options.left.push({
                    id : option.id,
                    text : option.left,
                    active : true
                });
                this.options.right.push({
                    id : option.id,
                    text : option.right,
                    active : true
                });
            });
            shuffle(this.options.left);
            shuffle(this.options.right);
            this.question.timer = setInterval(() => (this.question.time++), 1000);
        },
        match : function () {
            this.answer.push({
                left : this.targetLeft,
                right : this.targetRight
            });

            this.options.left = this.options.left.map((option) => {
                if(option.id === this.targetLeft.id) {
                    option.active = false;
                }
                return option;
            });

            this.options.right = this.options.right.map((option) => {
                if(option.id === this.targetRight.id) {
                    option.active = false;
                }
                return option;
            });

            this.targetRight = this.targetLeft = null;
        },
        unmatch : function (item) {
            this.answer.splice(this.answer.indexOf(item), 1);

            this.options.left = this.options.left.map((option) => {
                if(option.id === item.left.id) {
                    option.active = true;
                }
                return option;
            });

            this.options.right = this.options.right.map((option) => {
                if(option.id === item.right.id) {
                    option.active = true;
                }
                return option;
            });
        }
    },
    mounted : function () {
        this.render();
    }
});