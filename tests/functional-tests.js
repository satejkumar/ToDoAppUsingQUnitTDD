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
    },
    afterEach: function () {
        this.tasks = [];
    }
});

QUnit.test('Create a task', function(assert) {
    // Assemble and Act.
    var todo = new ToDo(),
        task_description = 'New Task';
    $('#new_task').val(task_description);
    $('#create_task').trigger('click');

    // Assert.
    var new_task = {
        'description': task_description,
        'is_complete': false
    };

    var is_task_saved = false;

    // Fixed global variable.
    for (var i in todo.tasks) {
        is_task_saved = todo.tasks[i].description === new_task.description;

        if (is_task_saved) {
            break;
        }
    }

    assert.ok(is_task_saved, 'Task saved.');

    var $tasks = $('#tasks p');
    var is_task_added = false;

    $.each($tasks, function(index, value) {
        var $current_task = $(this);
        var $current_task_checkbox = $current_task.find(':checkbox');
        var $current_task_description = $current_task.find(':text');

        if ($current_task_description.val() === new_task.description
            && $current_task_description.prop('disabled')
            && ! $current_task_checkbox.prop('checked')
            && ! $current_task_checkbox.prop('disabled')) {
            is_task_added = true;
            return false;
        }
    });

    assert.ok(is_task_added, 'Task added to list.');
});

QUnit.test('Test task render', function(assert) {
    var todo = new ToDo();
    todo.tasks = this.tasks;

    var $tasks = $('#tasks p');
    assert.strictEqual($tasks.length, todo.tasks.length, 'Task count is correct.');

    for (var i in todo.tasks) {
        var $current_task = $tasks.eq(i);
        var $current_task_description = $current_task.find(':text');
        var $current_task_checkbox = $current_task.find(':checkbox');

        assert.strictEqual(todo.tasks[i].description, $current_task_description.val(), 'Description matches.');
        assert.strictEqual($current_task_description.prop('disabled'), true, 'Description disabled.');
        assert.strictEqual(todo.tasks[i].is_complete, $current_task_checkbox.prop('checked'), 'Checkbox marked accordingly.');
        assert.strictEqual(todo.tasks[i].is_complete, $current_task_checkbox.prop('disabled'), 'Checkbox disabled accordingly.');
    }
});

QUnit.test('Test task complete.', function(assert) {
    // Mark the first task as complete.
    var todo = new ToDo();
    todo.tasks = this.tasks;

    var $first_task = $('#tasks p:first');
    var $first_task_checkbox = $first_task.find(':checkbox');
    $first_task_checkbox.trigger('click');

    assert.strictEqual($first_task_checkbox.prop('checked'), true, 'Task checked.');
    assert.strictEqual($first_task_checkbox.prop('disabled'), true, 'Task disabled.');
    assert.strictEqual(todo.tasks[0].is_complete, true, 'Value marked as complete.');
    assert.strictEqual($first_task.find(':text').prop('disabled'), true, 'Task description disabled.');
});

QUnit.test('Test create task button and text fields', function(assert) {
    assert.ok($('#create_task:input:button').length, 'Create task button present');

    var $new_task_input = $('#new_task:input:text');
    assert.ok($new_task_input.length, 'New task input text field present');
    assert.ok( ! $new_task_input.prop('disabled'), 'New task input text field is not disabled.');
});

QUnit.test('Reload tasks display', function(assert) {
    var todo = new ToDo();
    var $tasks = $('#tasks p');

    for (var i in todo.tasks) {
        assert.strictEqual(todo.tasks[i].description, $tasks.eq(i).find(':text').val());
        assert.strictEqual(todo.tasks[i].is_complete, $tasks.eq(i).find(':checkbox').prop('checked'));
        assert.strictEqual(todo.tasks[i].is_complete, $tasks.eq(i).find(':checkbox').prop('disabled'));
        assert.strictEqual($tasks.eq(i).find(':text').prop('disabled'), true);
    }
});
