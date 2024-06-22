const apiURL = "https://api.example.com/roles";

function fetchUsersByRole() {
    const role = document.getElementById('role-select').value;
    fetch(`${apiURL}/users/${role}`)
    .then(response => response.json())
    .then(data => updateUsersList(data))
    .catch(error => console.error('Error:', error));
}

function updateUsersList(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        userList.innerHTML += `<div class="user-item">
                                  <span>${user.name}</span>
                                  <button class="edit-button" onclick="editUser(${user.id})">Edit</button>
                                </div>`;
    });
}

function addUserToRole() {
    const role = document.getElementById('role-select').value;
    const name = document.getElementById('user-name').value;
    if (!name) {
        alert("Please enter a name.");
        return;
    }
    fetch(`${apiURL}/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, name })
    })
    .then(response => response.json())
    .then(() => {
        fetchUsersByRole(); // Refresh the list after adding
    })
    .catch(error => console.error('Error:', error));
}

function saveRoleChanges() {
    // Implementieren Sie die Funktion, um Änderungen an den Server zu POSTen
    console.log("Changes saved.");
}

window.onload = fetchUsersByRole;
