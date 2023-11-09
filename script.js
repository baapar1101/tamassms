document.getElementById('sendButton').addEventListener('click', function() {
    var apiKey = document.getElementById('apiKeyInput').value;
    var messageText = document.getElementById('messageInput').value;
    var sender = document.getElementById('senderInput').value;
    var recipients = document.getElementById('recipientsInput').value.split(',');
  
    // Create an object to hold the request data
    var requestData = {
      apiKey: apiKey,
      messageText: messageText,
      sender: sender,
      recipients: recipients
    };
  
    // Convert the request data to JSON
    var jsonData = JSON.stringify(requestData);
  
    // Send the API request
    sendApiRequest(jsonData);
  });
  
  function sendApiRequest(jsonData) {
    // Perform the POST request to your API endpoint
    fetch('your_api_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      // Update the result element with the received data
      document.getElementById('result').textContent = 'Result: ' + JSON.stringify(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
  }