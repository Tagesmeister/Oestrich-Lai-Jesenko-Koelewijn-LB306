function createProject() {
    const title = document.getElementById('input-title').value;
    const description = document.getElementById('input-log').value;

    // Sample static roleIDs for demonstration. In a real scenario, these would be collected from user input:
    const roleIDs = [];  // This needs to be dynamically gathered based on your application's UI

    const projectData = {
        projectName: title,
        description: description,
        roleIDs: roleIDs  // Assuming you have a way to gather this data : WAS SOLL DIES / STEFAN FRAGEN
    };

    const apiURL = "https://localhost:7270/api/Project/CreateProject";
    const accessToken = localStorage.getItem('accessToken');

    console.log("Using access token:", accessToken);
    console.log("Submitting project data:", projectData);

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(projectData)
    })
    .then(response => {
        if (!response.ok) {
            console.error("HTTP Error Response Code:", response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
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
