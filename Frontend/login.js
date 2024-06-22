let currentAction = 'login'; // Default action

function toggleAction(action) {
    currentAction = action;
    const submitButton = document.getElementById('submit');
    submitButton.textContent = action.charAt(0).toUpperCase() + action.slice(1); // Changes button text to "Login" or "Register"
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
        } else {
            // Assuming the response might be actual JSON string
            const result = JSON.parse(data);
            if (result.token) {
                localStorage.setItem('accessToken', result.token);
            }
        }
    })
    .catch(error => {
        console.error(`${currentAction} failed:`, error);
    });
    
}