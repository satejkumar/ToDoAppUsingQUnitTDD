"use strict";

var $ = jQuery;

function ToDo() {
    var todo_obj = this;
    this.key = 'tasks';

    $(function () {
        $('#create_task').click(function () {
            var description = $('#new_task').val();
            todo_obj.createTask(description);
            todo_obj.appendTask(description);
            todo_obj.saveTasks();
        });

        $('body').on('click', '#tasks p :checkbox', function () {
            var $current_checkbox = $(this),
                index = $('#tasks p').index($current_checkbox.parent());

            $current_checkbox.prop('disabled', true);
            todo_obj.tasks[index].is_complete = true;
            todo_obj.saveTasks();
        });
    });

    this.appendTask = function (description, is_complete) {
        var disabled = 'disabled="disabled"',
            checked_disabled_clause = ('undefined' === is_complete || !is_complete)
                ? '' : ' checked="checked" ' + disabled;
        $('#tasks').append('<p><input type="checkbox"' + checked_disabled_clause
            + ' /><input type="text" value="' + description + '" '
            + disabled + ' /></p>');
    };

    // can be renamed to pushTask.
    this.createTask = function (description) {
        this.tasks.push({
            'description': description,
            'is_complete': false
        });
    };

    this.renderTasks = function () {
        var i;

        for (i in this.tasks) {
            if (this.tasks.hasOwnProperty(i)) {
                this.appendTask(this.tasks[i].description, this.tasks[i].is_complete);
            }
        }
    };

    this.fetchTasks = function () {
        var tasks = localStorage.getItem(this.key);
        this.tasks = tasks ? JSON.parse(tasks) : [];
    };

    this.saveTasks = function () {
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    };

    this.fetchTasks();
    this.renderTasks();
}
