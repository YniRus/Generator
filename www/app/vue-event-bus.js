Vue.prototype.$eventBus = new Vue({
    data : {
        activeMode : null // activeMode объявляем супер-глобольно что бы легко иметь к нему доступ отовсюду
    },
    created : function () {
        let activeMode = $.cookie('activeMode');
        if(['questions','tests'].indexOf(activeMode) !== -1) {
            this.activeMode = activeMode;
        }
    }
}); // Global event bus