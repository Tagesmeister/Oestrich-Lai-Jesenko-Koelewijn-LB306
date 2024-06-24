const apiUrl = "https://localhost:7270/api/Task";
const accessToken = localStorage.getItem('accessToken');
window.onload = function() {
    fetchBacklogItems();
  
};

function saveBacklog() {
    const title = document.getElementById('input-title').value;
    const description = document.getElementById('input-log').value;
    const status = document.getElementById('input-status').value;

    const taskData = {
        title: title,
        description: description,
        status: status 
    };

    console.log("Using access token:", accessToken);
    console.log("Submitting project data:", taskData);

    fetch(`${apiUrl}/CreateTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(taskData)
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


async function fetchBacklogItems() {
    try {
        const response = await fetch(`${apiUrl}/GetTasks`, {
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
        const backlogItem = document.createElement('div');
        backlogItem.textContent = `Task ${item.taskID}: ${item.title}`;
        backlogItem.classList.add('backlog-item');
        backlogList.appendChild(backlogItem);
    });
}
