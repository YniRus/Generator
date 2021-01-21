let TestsVueApp = new Vue({
    el : "#testsVueApp",
    data : {
        user : {
            name : null,
            group : null
        },
        test : {
            id : null,
            info : {},
            progress : {
                timeLeft : null,
                timer : null,
                totalQuestionCount : 0,
                currentQuestionNumber : 1,
                currentDifficultLevel : 0,
            },
        },
        result : {
            points : 0,
            questionsStat : []
        },
        currentQuestionForm : null,
        currentQuestion : {},
        questions : [],
        delayedQuestions : [],
        allowDelay : true,
        completed : false,

        targetDifficult : 0,
        questionsDeviation : [],
        currentQuestionIndex : null
    },
    filters: {
        timeLeftFormat: function (timeLeft) {
            if(typeof timeLeft !== "undefined") {
                let time = [
                    Math.floor(timeLeft /60),
                    (timeLeft % 60)
                ];
                time = time.map(function (elem) {
                    if(Number(elem) < 10) {
                        return "0" + elem;
                    }
                    return elem;
                });
                return time.join(':');
            }
            return timeLeft;
        }
    },
    methods : {
        init : async function () {
            const urlParams = new URLSearchParams(window.location.search);
            this.user.name = urlParams.get('user_name');
            this.user.group = urlParams.get('user_group');
            this.test.id = urlParams.get('test_id');
            this.test.info = await this.loadTestInfo(this.test.id);
            this.questions = await this.loadQuestions(this.test.info);
            this.run();
        },
        skipQuestion : function() {
            // Сначала получаем данные этого вопроса
            let result = this.$refs.questionForm.getResult();
            result.skip = true;
            this.result.questionsStat.push(result);

            if(!this.updateProgress()) {
                return;
            }

            if(!this.checkDelayed()) {
                if(!this.updateQuestions()) {
                    return;
                }
            }

            this.renderQuestion();
        },
        nextQuestion: function () {
            // Сначала получаем данные этого вопроса
            let result = this.$refs.questionForm.getResult();
            this.result.points += result.points;
            this.result.questionsStat.push(result);

            if(!this.updateProgress()) {
                return;
            }

            if(!this.checkDelayed()) {
                if(!this.updateQuestions()) {
                    return;
                }
            }

            this.renderQuestion();
        },
        delayQuestion : function() {
            let info = {...this.questions[this.currentQuestionIndex]};

            info.time = this.currentQuestion.time;

            this.delayedQuestions.push(info);

            if(!this.checkDelayed()) {
                if(!this.updateQuestions()) {
                    return;
                }
            }

            this.renderQuestion();
        },
        checkDelayed : function() {
            if(this.delayedQuestions.length >= this.test.progress.totalQuestionCount - (this.test.progress.currentQuestionNumber - 1)) {
                Vue.set(this,'questions',this.delayedQuestions);
                this.questions = this.delayedQuestions;
                this.allowDelay = false;
                this.updateQuestionsDeviation();
                return true;
            }
            return false;
        },
        updateCurrentQuestionIndex : function() {
            let targetDeviation = Math.min(...this.questionsDeviation);
            let indexes = this.questionsDeviation.map(function (deviation,index) {
                if(deviation === targetDeviation) return index;
            });
            indexes = indexes.filter(function (value) {
                return value !== undefined;
            });
            // Получаем случайный ключ массива
            let index = Math.floor(Math.random() * indexes.length);
            this.currentQuestionIndex = indexes[index];
        },
        updateCurrentQuestionForm : function() {
            if (typeof this.currentQuestion.info !== 'undefined') {
                switch (this.currentQuestion.info.Type) {
                    case 'Выбор' : {
                        this.currentQuestionForm = 'question-type-choice';
                        return;
                    }
                    case 'Ввод' : {
                        this.currentQuestionForm = 'question-type-input';
                        return;
                    }
                    case 'Сопоставление' : {
                        this.currentQuestionForm = 'question-type-match';
                        return;
                    }
                }
                this.currentQuestionForm = null;
                return;
            }
        },
        updateProgress : function() {
            this.test.progress.currentQuestionNumber++;
            if(this.test.progress.currentQuestionNumber > this.test.progress.totalQuestionCount) {
                this.testComplete();
                return false;
            }
            this.test.progress.currentDifficultLevel -= this.currentQuestion.info.Difficult;

            this.updateTargetDifficult();

            return true;
        },
        updateTargetDifficult : function() {
            this.targetDifficult = this.test.progress.currentDifficultLevel / (this.test.progress.totalQuestionCount - (this.test.progress.currentQuestionNumber - 1));
        },
        updateQuestionsDeviation : function() {
            this.questionsDeviation = this.questions.map( (question) => {
                return Math.abs(Number(question.Difficult) - this.targetDifficult);
            });
        },
        updateQuestions : function() {
            Vue.set(this,'questions',this.questions.filter( (question,index) => {
                return index !== this.currentQuestionIndex
            }));

            if(this.questions.length === 0) {
                this.testComplete();
                return false;
            }

            this.updateQuestionsDeviation();

            return true;
        },
        renderQuestion : function() {
            this.currentQuestionForm = false;
            this.$nextTick().then(() => {
                this.updateCurrentQuestionIndex();
                let info = {...this.questions[this.currentQuestionIndex]};
                let time = info.time ? info.time : 0;
                this.currentQuestion = {
                    info: info,
                    timer: null,
                    time: time
                };
                this.updateCurrentQuestionForm();
            });
        },
        testComplete : async function() {
            clearInterval(this.test.progress.timer);
            this.currentQuestion = {};
            this.completed = true;
            this.result.maxPoints = Number(this.test.progress.totalQuestionCount);
            this.result.difficult = this.test.info.difficult;
            this.result.persent = Number((this.result.points/this.result.maxPoints).toFixed(2)) * 100;
            this.result.mark = this.getMark(this.result.persent);

            this.saveTestLog();
            this.updateQuestionsStat();
        },
        getMark : function(persent) {
            if(persent >= 86) {
                return 5;
            } else if(persent >= 66) {
                return 4;
            } else if (persent >= 41) {
                return 3;
            } else if (persent >= 21) {
                return 2;
            } else {
                return 1;
            }
        },
        saveTestLog : function() {
            $.post("SaveTestLog.php", {
                user : this.user,
                test_id : this.test.id,
                data : this.result
            });
        },
        updateQuestionsStat : function() {
            $.post("UpdateQuestionsStat.php", {
                data : this.result.questionsStat
            });
        },
        loadTestInfo : async function (test_id) {
            try {
                let tests = await $.get("GetTestInfo.php", {
                    id : test_id
                });
                return JSON.parse(tests);
            } catch (e) {
                return {};
            }
        },
        loadQuestions : async function (test_info) {
            try {
                let questions = await $.get("GetQuestionsInfo.php", {
                    subject_id: test_info.subject_id,
                    theme_id : test_info.theme_id
                });

                questions = JSON.parse(questions);

                questions = questions.map(function (question) {
                    question.Answers = JSON.parse(question.Answers);
                    return question;
                });

                return questions;
            } catch (e) {
                return [];
            }
        },
        progressTimer : function() {
            this.test.progress.timeLeft--;
            if(this.test.progress.timeLeft <= 0) {
                // Время вышло
                this.testComplete();
                return;
            }
        },
        run : function () {
            // Инициальзируем таймер
            this.test.progress.timeLeft = this.test.info.time * 60;
            this.test.progress.timer = setInterval(this.progressTimer, 1000);

            this.test.progress.totalQuestionCount = this.test.info.question_count;
            this.test.progress.currentQuestionNumber = 1;
            this.test.progress.currentDifficultLevel =  this.test.info.difficult;
            this.test.progress.currentQuestion = {};

            // // Рендерим вопрос
            this.updateTargetDifficult();
            this.updateQuestionsDeviation();
            this.renderQuestion();
        }
    },
    mounted: function () {
        this.init();
    }
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}