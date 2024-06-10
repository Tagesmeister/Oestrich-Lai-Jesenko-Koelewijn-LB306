const apiURL = ""

function PostDescription(){
    let inputText = document.getElementById('input-log').value;
    let inputTitle = document.getElementById('input-title').value;

    const formData = new FormData()
    
    formData.append('title', inputTitle);
    formData.append('description', inputText);
    formData.append('status', 'Open');

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    fetch(apiURL,{
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        console.log('Sucess:', data);
    })
    .catch((error) => {
        console.error('Error:', error);   
        alert('Error submitting form!');
      });
}