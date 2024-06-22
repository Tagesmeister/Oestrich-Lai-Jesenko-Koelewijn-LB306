window.onload = function() {
    fetchDevelopers();
    fetchBacklogItems();
};

function fetchDevelopers() {
    fetch('YOUR_API_URL_FOR_DEVELOPERS')
    .then(response => response.json())
    .then(data => updateDeveloperList(data))
    .catch(error => console.error('Error:', error));
}

function updateDeveloperList(developers) {
    const list = document.querySelector('.developer-list');
    list.innerHTML = ''; // Clear existing items
    developers.forEach(dev => {
        const status = dev.assigned ? 'green' : 'red';
        const symbol = dev.assigned ? '✔' : '✘';
        list.innerHTML += `<div class="developer-item">${dev.name} <span style="color: ${status};">${symbol}</span></div>`;
    });
}

function fetchBacklogItems() {
    fetch('YOUR_API_URL_FOR_BACKLOG_ITEMS')
    .then(response => response.json())
    .then(data => updateBacklogList(data))
    .catch(error => console.error('Error:', error));
}

function updateBacklogList(items) {
    const list = document.querySelector('.backlog-list');
    list.innerHTML = ''; // Clear existing items
    items.forEach(item => {
        const status = item.completed ? 'green' : 'red';
        const symbol = item.completed ? '✔' : '✘';
        list.innerHTML += `<div class="backlog-item">Nr. ${item.id} <span style="color: ${status};">${symbol}</span></div>`;
    });
}
