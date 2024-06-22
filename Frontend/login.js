let currentAction = 'login'; // Default action
let developersCount = 1; // Initial number of developers input fields
let projectIDs = JSON.parse(localStorage.getItem('projectIDs')) || []; // Load project IDs from localStorage

function toggleAction(action) {
    currentAction = action;
    const submitButton = document.getElementById('submit');
    submitButton.textContent = action.charAt(0).toUpperCase() + action.slice(1); // Changes button text to "Login" or "Register"

    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');

    if (action === 'login') {
        loginButton.classList.add('active');
        registerButton.classList.remove('active');
    } else {
        registerButton.classList.add('active');
        loginButton.classList.remove('active');
    }
}

function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = `https://localhost:7270/api/Auth/${currentAction}`;
    const data = {
        username: username,
        password: password
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();  // Use .text() instead of .json() if the response is a token string
    })
    .then(data => {
        console.log(`${currentAction} successful:`, data);
        if (data.startsWith("eyJ")) {  // Check if it looks like a JWT
            localStorage.setItem('accessToken', data);
            showDashboard();
        } else {
            // Assuming the response might be actual JSON string
            const result = JSON.parse(data);
            if (result.token) {
                localStorage.setItem('accessToken', result.token);
                showDashboard();
            }
        }
    })
    .catch(error => {
        console.error(`${currentAction} failed:`, error);
    });
}

function showDashboard() {
    document.getElementById('login-main-container').style.display = 'none';
    document.getElementById('dashboard-main-container').style.display = 'flex';
    fetchScrums();
}

function fetchScrums() {
    projectIDs.forEach(id => {
        fetchProject(id);
    });
}

function fetchProject(id) {
    const url = `https://localhost:7270/api/Project/GetProject/${id}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const scrumList = document.getElementById('scrum-list');
        scrumList.innerHTML += `<div>
                                    <span onclick="showScrumDetails(${data.projectID})">${data.projectName}</span>
                                    <button onclick="deleteScrum(${data.projectID})">✖</button>
                                </div>`;
    })
    .catch(error => {
        console.error('Fetching project failed:', error);
    });
}

function showCreateScrum() {
    document.getElementById('dashboard-main-container').style.display = 'none';
    document.getElementById('create-scrum-container').style.display = 'flex';
}

function addDeveloper() {
    developersCount++;
    const developersList = document.getElementById('developers-list');
    developersList.innerHTML += `<input id="developer${developersCount}" type="text">`;
}

function createScrum() {
    const projectName = document.getElementById('project-name').value;
    const productOwner = document.getElementById('product-owner').value;
    const scrumMaster = document.getElementById('scrum-master').value;
    const developers = [];
    for (let i = 1; i <= developersCount; i++) {
        const developer = document.getElementById(`developer${i}`).value;
        if (developer) {
            developers.push(developer);
        }
    }

    const url = 'https://localhost:7270/api/Project/CreateProject';
    const projectData = {
        projectName: projectName,
        description: '',
        roleIDs: [] // Assuming the backend assigns role IDs and you are only setting role names
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(projectData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
        }
        return response.json();
    })
    .then(project => {
        projectIDs.push(project.projectID); // Add the newly created project ID to the list
        localStorage.setItem('projectIDs', JSON.stringify(projectIDs)); // Save project IDs to localStorage
        // Assuming you need to create roles after project creation
        const roles = [
            { roleName: 'Product Owner', projectID: project.projectID },
            { roleName: 'Scrum Master', projectID: project.projectID },
            ...developers.map(dev => ({ roleName: 'Developer', projectID: project.projectID }))
        ];

        // Create roles
        return Promise.all(roles.map(role => {
            return fetch('https://localhost:7270/api/Role/CreateRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(role)
            });
        }));
    })
    .then(() => {
        console.log('Scrum created successfully');
        showHome();
    })
    .catch(error => {
        console.error('Create scrum failed:', error);
    });
}

function deleteScrum(projectID) {
    const url = `https://localhost:7270/api/Project/DeleteProject/${projectID}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Scrum deleted:', data);
        projectIDs = projectIDs.filter(id => id !== projectID); // Remove the deleted project ID from the list
        localStorage.setItem('projectIDs', JSON.stringify(projectIDs)); // Update project IDs in localStorage
        fetchScrums();  // Refresh the list after deletion
    })
    .catch(error => {
        console.error('Delete scrum failed:', error);
    });
}

function showHome() {
    document.getElementById('create-scrum-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'flex';
    document.getElementById('dashboard-main-container').style.display = 'none';
    fetchScrums();
}

function showScrumDetails(projectID) {
    // Implement the logic to display the detailed view of the selected scrum
    document.getElementById('home-container').style.display = 'flex';
    document.getElementById('dashboard-main-container').style.display = 'none';
    fetchProjectDetails(projectID);
}

function fetchProjectDetails(projectID) {
    const url = `https://localhost:7270/api/Project/GetProject/${projectID}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const homeContent = document.getElementById('home-content');
        homeContent.innerHTML = `<h2>Project: ${data.projectName}</h2>
                                 <p>Description: ${data.description}</p>
                                 <p>Roles: ${data.roleIDs.join(', ')}</p>`;
    })
    .catch(error => {
        console.error('Fetching project details failed:', error);
    });
}

function logOut() {
    localStorage.removeItem('accessToken');
    document.getElementById('dashboard-main-container').style.display = 'none';
    document.getElementById('create-scrum-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'none';
    document.getElementById('login-main-container').style.display = 'flex';
}
