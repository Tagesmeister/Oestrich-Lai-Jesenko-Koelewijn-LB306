const apiUrl = "https://localhost:7270/api";
const accessToken = localStorage.getItem('accessToken');

// On window load, fetch role assignments, tasks, and scrum logs
window.onload = function() {
    fetchScrumLogs()
};

function saveLog() {
    const title = document.getElementById('log-title').value;
    const description = document.getElementById('log-description').value;


    const SprintBackLogData = {
        Title: title,
        Description: description
    };

   
    console.log("Submitting project data:", SprintBackLogData);

    fetch(`${apiUrl}/APISprintBackLog/CreateSprintBackLog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(SprintBackLogData)
    })
    .then(response => {
        if (!response.ok) {
            console.error("HTTP Error Response Code:", response.status);
            return response.json().then(err => { throw new Error(`HTTP error! status: ${response.status}, message: ${err.message}`); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Project successfully created!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form!');
    });
}

async function fetchScrumLogs() {
    try {
        const response = await fetch(`${apiUrl}/APISprintBackLog/GetSprintBackLogs`, {
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
        logItem.textContent = `Log ${log.sprintBackLogID}: 
        Title:${log.title} 
        Description: ${log.description}`;
        logList.appendChild(logItem);
    });
}
