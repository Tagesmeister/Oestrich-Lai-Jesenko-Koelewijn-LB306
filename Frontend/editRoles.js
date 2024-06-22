const apiUrl = "https://localhost:7270/api/Role";
const roleIDs = {}; // This will hold the role information with IDs

// Fetch users by role and update the user list
async function fetchUsersByRole() {
  const role = document.getElementById("role-select").value;
  console.log(`Fetching users for role: ${role}`); // Added for debugging
  try {
    const response = await fetch(`${apiUrl}/users/${role}`);
    console.log(`Response status: ${response.status}`); // Added for debugging
    if (!response.ok) {
      const errorText = await response.text(); // Added for debugging
      throw new Error(
        `Network response was not ok: ${response.status} - ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Fetched data:", data); // Added for debugging
    updateUsersList(data);
  } catch (error) {
    console.error("Error:", error);
    alert(
      `Failed to fetch users for the role: ${role}. Error: ${error.message}`
    );
  }
}

// Update the user list in the UI
function updateUsersList(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  users.forEach((user) => {
    userList.innerHTML += `
      <div class="user-item">
        <span>${user.name}</span>
        <button class="edit-button" onclick="editUser(${user.id})">Edit</button>
        <button class="edit-button" onclick="deleteUser(${user.id})">Delete</button>
      </div>`;
  });
}

// Create a new role
async function createRole(role, name) {
  try {
    const response = await fetch(`${apiUrl}/CreateRole`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, name }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    roleIDs[data.id] = { role, name };
    fetchUsersByRole(); // Refresh the list after creating
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to create role: ${role}. Error: ${error.message}`);
  }
}

// Update an existing role
async function updateRole(roleId, role, name) {
  try {
    const response = await fetch(`${apiUrl}/UpdateRole/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, name }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    roleIDs[roleId] = { role, name };
    fetchUsersByRole(); // Refresh the list after updating
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to update role: ${role}. Error: ${error.message}`);
  }
}

// Delete a user by role ID
async function deleteUser(roleId) {
  try {
    const response = await fetch(`${apiUrl}/DeleteRole/${roleId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Network response was not ok");
    delete roleIDs[roleId];
    fetchUsersByRole(); // Refresh the list after deleting
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to delete user with ID: ${roleId}. Error: ${error.message}`);
  }
}

// Add or update a user based on the role
async function addOrUpdateUser() {
  const role = document.getElementById("role-select").value;
  const name = document.getElementById("user-name").value;
  if (!name) {
    alert("Please enter a name.");
    return;
  }
  const existingRoleId = Object.keys(roleIDs).find(
    (key) => roleIDs[key].role === role && roleIDs[key].name === name
  );
  if (existingRoleId) {
    await updateRole(existingRoleId, role, name);
  } else {
    await createRole(role, name);
  }
}

// Save role changes (this can be extended to save all changes at once)
function saveRoleChanges() {
  console.log("Changes saved.");
  console.log(roleIDs); // Log the current state of roleIDs
  // Implement additional save logic if necessary
}

// Edit user (populate the form with user data for editing)
function editUser(roleId) {
  const user = roleIDs[roleId];
  if (user) {
    document.getElementById("role-select").value = user.role;
    document.getElementById("user-name").value = user.name;
  }
}

// Initial load
window.onload = fetchUsersByRole;
