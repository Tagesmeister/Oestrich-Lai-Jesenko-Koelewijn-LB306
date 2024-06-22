window.onload = function() {
    fetchRoleAssignments();
    fetchTasks();
    fetchScrumLogs();
};

function fetchRoleAssignments() {
    fetch('https://api.example.com/roles/assignments')
    .then(response => response.json())
    .then(data => displayRoleAssignments(data))
    .catch(error => console.error('Error:', error));
}

function displayRoleAssignments(assignments) {
    const roleAssignments = document.getElementById('role-assignments');
    roleAssignments.innerHTML = '';
    assignments.forEach(assignment => {
        roleAssignments.innerHTML += `<div class="role-assignment">
                                        <strong>${assignment.role}:</strong> ${assignment.user}
                                      </div>`;
    });
}

function fetchTasks() {
    fetch('https://api.example.com/tasks')
    .then(response => response.json())
    .then(data => displayTasks(data))
    .catch(error => console.error('Error:', error));
}

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.innerHTML += `<div class="task-item">
                                 <span>Task ${task.id}: ${task.description} - Assigned to ${task.assignedUser}</span>
                               </div>`;
    });
}

function fetchScrumLogs() {
    fetch('https://api.example.com/scrumlogs')
    .then(response => response.json())
    .then(data => displayScrumLogs(data))
    .catch(error => console.error('Error:', error));
}

function displayScrumLogs(logs) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    logs.forEach(log => {
        logList.innerHTML += `<div class="log-item">
                                Nr. ${log.id} <span>${log.title}</span> - <button class="delete-button">✖</button>
                              </div>`;
    });
}
