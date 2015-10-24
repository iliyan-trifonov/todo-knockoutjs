(function (ko, $) {
    'use strict';

    var TODO = function (text) {
        this.text = text || '';
        this.completed = false;
    };

    var TODOS = function (todos) {
        this.todos = ko.observableArray([]);

        this.text = ko.observable('');

        todos.forEach(function (data) {
            var todo = new TODO(data.text);
            todo.completed = data.completed;
            this.todos.push(todo);
        }, this);

        this.addTodo = function () {
            if (!this.text()) {
                return;
            }

            var todo = new TODO(this.text());
            this.todos.push(todo);
            this.text('');
        };

        this.keyUp = function (d, e) {
            if (e.keyCode === 13) {
                this.addTodo();
            }
        };

        this.deleteCompleted = function () {
            this.todos(ko.utils.arrayFilter(this.todos(), function (todo) {
                return !todo.completed;
            }));
        };
    };

    var initialData = [
        {text: 'sample TODO 1', completed: false},
        {text: 'sample TODO 2', completed: true},
        {text: 'sample TODO 3', completed: false}
    ];

    ko.applyBindings(new TODOS(initialData));

})(ko, $);
