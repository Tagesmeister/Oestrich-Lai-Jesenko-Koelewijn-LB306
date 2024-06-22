const apiUrl = "https://localhost:7270/api";
const accessToken = localStorage.getItem('accessToken');

// On window load, fetch role assignments, tasks, and scrum logs
window.onload = function() {
    fetchRoleAssignments();
    fetchSprintTasks();
   
};

// Fetch role assignments from the API and display them
async function fetchRoleAssignments() {
    try {
        const response = await fetch(`${apiUrl}/Role/GetRoles`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch role assignments");
        const roles = await response.json();
        displayRoleAssignments(roles);
    } catch (error) {
        console.error("Error fetching role assignments:", error);
    }
}

function displayRoleAssignments(assignments) {
    const roleAssignments = document.getElementById('role-assignments');
    roleAssignments.innerHTML = '';
    assignments.forEach(assignment => {
        const roleItem = document.createElement('div');
        roleItem.textContent = `${assignment.roleName}: ${assignment.name}`; // Assuming each role object has 'roleName' and 'name' properties
        roleAssignments.appendChild(roleItem);
    });
}


async function fetchSprintTasks() {
    try {
        const response = await fetch(`${apiUrl}/Sprint/GetSprints`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch sprints");
        const sprints = await response.json();

        let index = 0; // Initialize index

        while (true) {
            let taskFound = false;

            for (const sprint of sprints) {
                if (Array.isArray(sprint.taskIDs) && index < sprint.taskIDs.length) {
                    const taskID = sprint.taskIDs[index]; // Get the task ID at the current index
                    await fetchTask(taskID); // Fetch and display the task
                    taskFound = true;
                }
            }

            if (!taskFound) {
                break; // Exit the loop if no task was found in any sprint
            }

            index += 1; // Increment the index for the next round
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Fetch a single task based on ID
async function fetchTask(id) {
    try {
        const response = await fetch(`${apiUrl}/Task/GetTask/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error(`Failed to fetch task ${id}`);
        const task = await response.json();
        displayTask(task); // Display the single task
    } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
    }
}

// Display a single task in the HTML
function displayTask(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('div');
    taskItem.textContent = `Task ${task.taskID}: ${task.description}`; // Assuming each task object has 'taskID' and 'description' properties
    taskItem.classList.add('task-item');
    taskList.appendChild(taskItem);
}


async function fetchScrumLogs() {
    try {
        const response = await fetch(`${apiUrl}/scrumlogs`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch scrum logs");
        const logs = await response.json();
        displayScrumLogs(logs);
    } catch (error) {
        console.error("Error fetching scrum logs:", error);
    }
}

function displayScrumLogs(logs) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    logs.forEach(log => {
        const logItem = document.createElement('div');
        logItem.textContent = `Log ${log.id}: ${log.title}`;
        logList.appendChild(logItem);
    });
}
