QUnit.module('To-Do List Test', {
    beforeEach: function () {
        // Lets create a list of dummy tasks.
        this.tasks = [
            {
                'description': 'Task one',
                'is_complete': false
            },
            {
                'description': 'Task two',
                'is_complete': false 
            },
            {
                 'description': 'Task three',
                 'is_complete': true
            },
            {
                 'description': 'Task four',
                 'is_complete': true
            }
        ];

        this.key = 'unit_tests_tasks';
    },
    afterEach: function () {
        this.tasks = [];
        this.key = '';
    }
});

QUnit.test('Fetch tasks', function(assert) {
    var tasks = [];
    localStorage.setItem(this.key, JSON.stringify(tasks));

    var todo = new ToDo();
    todo.key = this.key;
    todo.fetchTasks();

    assert.deepEqual(tasks, todo.tasks, 'Fetched empty task match.');

    tasks = this.tasks;
    localStorage.setItem(this.key, JSON.stringify(tasks));

    todo = new ToDo();
    todo.key = this.key;
    todo.fetchTasks();

    assert.deepEqual(tasks, todo.tasks, 'Fetched tasks match.');
});

QUnit.test('Save Tasks', function(assert) {
    var tasks = [];
    var todo = new ToDo();
    todo.key = this.key;

    todo.tasks = tasks;
    todo.saveTasks();
    assert.strictEqual(localStorage.getItem(todo.key), JSON.stringify(tasks), 'Saved empty task match.');

    tasks = this.tasks;
    todo.tasks = tasks;
    todo.saveTasks();
    assert.strictEqual(localStorage.getItem(todo.key), JSON.stringify(tasks), 'Saved tasks match.');
});

QUnit.test('Create Task', function(assert) {
    var todo = new ToDo();
    todo.tasks = [];
    todo.key = this.key;

    for (var i in this.tasks) {
        todo.createTask(this.tasks[i].description);
        assert.strictEqual(todo.tasks[i].description, this.tasks[i].description, 'Description matches.');
        assert.notOk(todo.tasks[i].is_complete);
    }
});

QUnit.test('Append Task', function(assert) {
    var todo = new ToDo();
    todo.tasks = [];
    todo.key = this.key;

    $('#tasks').html('');

    for (var i in this.tasks) {
        todo.appendTask(this.tasks[i].description);
        assert.strictEqual($('#tasks p').eq(i).find(':text').val(), this.tasks[i].description, 'Description of appended task matches.');
        assert.strictEqual($('#tasks p').eq(i).find(':text').prop('disabled'), true, 'Description is disabled..');
        assert.strictEqual($('#tasks p').eq(i).find(':checkbox').prop('checked'), false, 'Appended task not checked.');
        assert.strictEqual($('#tasks p').eq(i).find(':checkbox').prop('disabled'), false, 'Appended task is not disabled.');
    }
});
