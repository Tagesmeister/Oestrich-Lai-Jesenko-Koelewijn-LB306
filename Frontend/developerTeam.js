const apiUrl = "https://localhost:7270/api";
const accessToken = localStorage.getItem('accessToken');

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
        console.log('Roles fetched:', roles);
        updateRoleList(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
}

function updateRoleList(roles) {
    const roleList = document.getElementById('role-list');
    roleList.innerHTML = ''; 
    roles.forEach(role => {
        console.log('Role:', role);
        const listItem = document.createElement('li');
        listItem.classList.add('role-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('role-checkbox');
        checkbox.value = role.roleID;
        
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(`${role.roleID} ${role.roleName}: ${role.name}`));
        roleList.appendChild(listItem);
    });
}

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
        backlogItem.classList.add('backlog-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.value = item.taskID;
        
        backlogItem.appendChild(checkbox);
        backlogItem.appendChild(document.createTextNode(`Task ${item.taskID}: ${item.title}`));
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
        Status: status 
    };

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
        console.log("Task successfully created");
        fetchBacklogItems();
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

async function startSprint() {
    // Get selected task IDs
    const checkedTaskElements = document.querySelectorAll('.task-checkbox:checked');
    const taskIDs = Array.from(checkedTaskElements).map(checkbox => parseInt(checkbox.value, 10));

    console.log("Task IDs:", taskIDs);

    // Get selected role IDs
    const checkedRoleElements = document.querySelectorAll('.role-checkbox:checked');
    const roleIDs = Array.from(checkedRoleElements).map(checkbox => parseInt(checkbox.value, 10));

    console.log("Role IDs:", roleIDs);

    const startDate = document.getElementById('sprint-StartDate').value;
    const endDate = document.getElementById('sprint-EndDate').value;
    const project = document.getElementById('sprint-Project').value;

    const sprintData = { 
        TaskIDs: taskIDs,
        RoleIDs: roleIDs,
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
        fetchBacklogItems(); // Refresh the backlog items
    } catch (error) {
        console.error("Error starting sprint:", error);
    }
}


async function assignRolesToTask() {
    const checkedRoleElements = document.querySelectorAll('.role-checkbox:checked');
    const roleIDs = Array.from(checkedRoleElements).map(checkbox => parseInt(checkbox.value, 10));

    console.log("Role IDs:", roleIDs);

    try {
        const response = await fetch(`${apiUrl}/Task/AssignRoles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ RoleIDs: roleIDs, TaskID: TaskID })
        });
        if (!response.ok) throw new Error("Failed to assign roles to task");
        console.log("Roles successfully assigned to task");
    } catch (error) {
        console.error("Error assigning roles to task:", error);
    }
}
