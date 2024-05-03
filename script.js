$(document).ready(() => {
    // Load tasks when the page is ready
    loadTasks();

    // Handle form submission
    $('#taskForm').submit((event) => {
        event.preventDefault();

        const title = $('#title').val();
        const description = $('#description').val();
        const dueDate = $('#dueDate').val();

        if (title && description && dueDate) {
            // Add task
            addTask({ title, description, dueDate });
            // Clear form
            $('#taskForm')[0].reset();
        }
    });
});

function loadTasks() {
    $.ajax({
        url: '/api/tasks',
        type: 'GET',
        success: (data) => {
            $('#taskList').empty();
            data.forEach(task => {
                $('#taskList').append(`
                    <li class="list-group-item">
                        <h5>${task.title}</h5>
                        <p>${task.description}</p>
                        <p><strong>Due Date:</strong> ${task.dueDate}</p>
                    </li>
                `);
            });
        }
    });
}

function addTask(task) {
    $.ajax({
        url: '/api/tasks',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(task),
        success: () => {
            loadTasks();
        }
    });
}
