let currentAction = 'login';
let developersCount = 1;
let projectIDs = JSON.parse(localStorage.getItem('projectIDs')) || [];

function toggleAction(action) {
    currentAction = action;
    const submitButton = document.getElementById('submit');
    submitButton.textContent = action.charAt(0).toUpperCase() + action.slice(1);

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
        return response.text();
    })
    .then(data => {
        console.log(`${currentAction} successful:`, data);
        if (data.startsWith("eyJ")) {
            localStorage.setItem('accessToken', data);
            showDashboard();
        } else {
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

    const roles = [
        { name: productOwner, roleName: 'Product Owner' },
        { name: scrumMaster, roleName: 'Scrum Master' },
        ...developers.map((dev, index) => ({ name: dev, roleName: `Developer ${index + 1}` }))
    ];

    // Create roles
    Promise.all(roles.map(role => {
        return fetch('https://localhost:7270/api/Role/CreateRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(role)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
            }
            return response.json();
        });
    }))
    .then(createdRoles => {
        const roleIDs = createdRoles.map(role => role.roleID);
        
        const projectData = {
            projectName: projectName,
            description: '',
            roleIDs: roleIDs
        };

        const url = 'https://localhost:7270/api/Project/CreateProject';
        return fetch(url, {
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
        });
    })
    .then(project => {
        projectIDs.push(project.projectID);
        localStorage.setItem('projectIDs', JSON.stringify(projectIDs));
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
        return response.text();
    })
    .then(() => {
        console.log('Scrum deleted successfully');
        projectIDs = projectIDs.filter(id => id !== projectID);
        localStorage.setItem('projectIDs', JSON.stringify(projectIDs));
        fetchScrums();
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
