(function (ko, $, window) {
    'use strict';

    var TODO = function (text) {
        if (typeof text === 'undefined') {
            throw new Error('Invalid text given for the new TODO!');
        }
        this.text = text;
        this.completed = ko.observable(false);
    };

    var TODOS = function (todos) {
        this.todos = ko.observableArray([]);

        this.text = ko.observable('');

        todos.forEach(function (data) {
            var todo = new TODO(data.text);
            todo.completed(data.completed);
            this.todos.push(todo);
        }, this);

        this.addTodo = function () {
            if (!this.text()) {
                return;
            }

            var todo = new TODO(this.text());
            this.todos.push(todo);
            this.text('');

            this.saveTodos();
        };

        this.saveTodos = function () {
            storage.save('data', ko.toJS(this.todos()));
        };

        this.keyUp = function (d, e) {
            if (e.keyCode === 13) {
                this.addTodo();
            }
        };

        this.checkChanged = function (d, e) {
            this.saveTodos();
        }.bind(this);

        this.deleteCompleted = function () {
            this.todos(ko.utils.arrayFilter(this.todos(), function (todo) {
                return !todo.completed();
            }));
            this.saveTodos();
        };
    };

    var Storage = function () {
    };

    Storage.prototype.save = function (key, value) {
        return window.localStorage.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.get = function (key) {
        var item = window.localStorage.getItem(key);
        if (!item) {
            return null;
        } else {
            return JSON.parse(item);
        }
    };

    /////

    var storage = new Storage();

    var initialData = storage.get('data') || [
        {text: 'sample TODO 1', completed: false},
        {text: 'sample TODO 2', completed: true},
        {text: 'sample TODO 3', completed: false}
    ];

    ko.applyBindings(new TODOS(initialData));

})(ko, $, window);
