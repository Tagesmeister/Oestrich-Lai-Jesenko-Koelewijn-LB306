const apiUrl = "https://localhost:7270/api/Role";
const roleIDs = {};

const accessToken = localStorage.getItem('accessToken');

// Fetch roles and update the role list
async function fetchRoles() {
  try {
      const response = await fetch(`${apiUrl}/GetRoles`, {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      updateRoleList(data);
  } catch (error) {
      console.error("Error:", error);
      alert(`Failed to fetch roles. Error: ${error.message}`);
  }
}

function updateRoleList(roles) {
  const roleList = document.getElementById('role-list');
  roleList.innerHTML = ''; // Clear existing list items
  roles.forEach(role => {
      const listItem = document.createElement('li');
      listItem.textContent = role.name; // Assuming each role object has a 'name' property
      roleList.appendChild(listItem);
  });
}



// Add a new role
async function addRole() {
  const role = document.getElementById('role-select').value;
  const username = document.getElementById('user-name').value;
  const projectData = {
    RoleName: role,
    Name: username
  };

  try {
    const response = await fetch(`${apiUrl}/CreateRole`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const data = await response.json();
    roleIDs[data.RoleID] = { name: data.Name };
    console.log('Role added successfully:', data);
    fetchRoles(); 
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// Update an existing role
async function updateRole(roleId, role, name) {
  try {
    const response = await fetch(`${apiUrl}/UpdateRole/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ RoleName: role, Name: name }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    roleIDs[roleId] = { role, name };
    fetchRoles(); // Refresh the list after updating
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to update role: ${role}. Error: ${error.message}`);
  }
}

// Delete a role by role ID
async function deleteRole(roleID) {
  try {
    const response = await fetch(`${apiUrl}/DeleteRole/${roleID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    delete roleIDs[roleID];
    console.log('Role deleted successfully');
    fetchRoles(); // Refresh the list after deleting
  } catch (error) {
    console.error('Error deleting role:', error);
  }
}

async function getRole(roleID) {
  try {
    const response = await fetch(`${apiUrl}/GetRole/${roleID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Role fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching role:', error);
  }
}

// Edit role (populate the form with role data for editing)
function editRole(roleId) {
  const role = roleIDs[roleId];
  if (role) {
    document.getElementById("role-select").value = role.role;
    document.getElementById("user-name").value = role.name;
  }
}

console.log("Using access token:", accessToken);
console.log("Submitting project data:", projectData);
