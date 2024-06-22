const apiUrl = "https://localhost:7270/api";
const accessToken = localStorage.getItem('accessToken');

// On window load, fetch developers and backlog items


window.onload = function() {
    fetchRoles();
    fetchBacklogItems();
  
};


async function fetchRoles() {
    try {
        const response = await fetch(`${apiUrl}/Role/GetRoles`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch roles");
        const roles = await response.json();
        console.log('Roles fetched:', roles); // Log the fetched roles
        updateRoleList(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
}

function updateRoleList(roles) {
    const roleList = document.getElementById('role-list');
    roleList.innerHTML = ''; 
    roles.forEach(role => {
        console.log('Role:', role); // Log each role to verify its structure
        const listItem = document.createElement('li');
        listItem.textContent = `${role.roleID} ${role.roleName}: ${role.name}`; // Assuming each role object has 'id', 'roleName', and 'name' properties
        listItem.classList.add('developer-item');
        roleList.appendChild(listItem);
    });
}


// Fetch backlog items from the API and update the backlog list
async function fetchBacklogItems() {
    try {
        const response = await fetch(`${apiUrl}/Task/GetTasks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch backlog items");
        const backlogItems = await response.json();
        updateBacklogList(backlogItems);
    } catch (error) {
        console.error("Error fetching backlog items:", error);
    }
}

function updateBacklogList(items) {
    const backlogList = document.getElementById('backlog-list');
    backlogList.innerHTML = '';
    items.forEach(item => {
        const backlogItem = document.createElement('li');
        backlogItem.textContent = `Task ${item.taskID}: ${item.title}`;
        backlogItem.classList.add('backlog-item');
        backlogList.appendChild(backlogItem);
    });
}


async function saveTask() {
    console.log("ich hasse Javascript");
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const status = document.getElementById('task-status').value;
    
    const taskData = { 
        Title: title, 
        Description: description, 
        Status: status };

    try {
        const response = await fetch(`${apiUrl}/Task/CreateTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(taskData)
            
        });
        if (!response.ok) throw new Error("Failed to create task");
        console.log("ich hasse Javascript");
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

// Start a new sprint by adding all backlog items
async function startSprint() {
    const taskElements = document.querySelectorAll('.backlog-item');
    const taskIDs = Array.from(taskElements).map(item => extractTaskID(item.textContent));
    
    console.log("Task IDs:", taskIDs); // Debugging line to check the extracted IDs
    
    const startDate = document.getElementById('sprint-StartDate').value;
    const endDate = document.getElementById('sprint-EndDate').value;
    const project = document.getElementById('sprint-Project').value;

    const sprintData = { 
        TaskIDs: taskIDs,
        StartDate: startDate,
        EndDate: endDate,
        Project: project
    };

    try {
        const response = await fetch(`${apiUrl}/Sprint/CreateSprint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(sprintData)
        });
        if (!response.ok) throw new Error("Failed to start sprint");
        fetchBacklogItems();
    } catch (error) {
        console.error("Error starting sprint:", error);
    }
}

function extractTaskID(taskText) {
    const match = taskText.match(/^Task (\d+):/);
    return match ? parseInt(match[1], 10) : null;
}

