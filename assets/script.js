document.addEventListener('DOMContentLoaded', function () {
    const toDoForm = document.getElementById('content__toDo__Form');
    const toDoInput = document.getElementById('toDo');
    const taskList = document.querySelector('.list');
    let taskIdCounter = 1;

    loadTasks();

    toDoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = toDoInput.value;
        addTask(taskText);
        saveTasks();
        toDoInput.value = '';
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        taskItem.appendChild(checkbox);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Done';
        deleteButton.classList.add('delete-button');
        const taskId = `task-${taskIdCounter++}`;
        deleteButton.id = taskId;
        taskItem.appendChild(deleteButton);

        checkbox.addEventListener('change', function () {
            taskItem.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];

        document.querySelectorAll('.list li').forEach(function (taskItem) {
            tasks.push({
                text: taskItem.querySelector('span:nth-child(2)').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(function (task) {
            addTaskWithState(task.text, task.completed);
        });
    }

    function addTaskWithState(taskText, completed) {
        const taskItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        taskItem.appendChild(checkbox);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '-';
        deleteButton.classList.add('delete-button');
        const taskId = `task-${taskIdCounter++}`;
        deleteButton.id = taskId;
        taskItem.appendChild(deleteButton);

        checkbox.addEventListener('change', function () {
            taskItem.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            saveTasks();
        });

        checkbox.checked = completed;

        if (completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    }
});