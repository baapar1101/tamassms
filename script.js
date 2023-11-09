document.getElementById('sendButton').addEventListener('click', function() {
    var apiKey = document.getElementById('apiKeyInput').value;
    var messageText = document.getElementById('messageInput').value;
    var sender = document.getElementById('senderInput').value;
    var recipients = document.getElementById('recipientsInput').value.split(',');
  
    // Create an object to hold the request data
    var requestData = {
      ApiKey: apiKey,
      Text: messageText,
      Sender: sender,
      Recipients: recipients
    };
  
    // Send the API request using the requestData object
    sendApiRequest(requestData);
  });
  
  function sendApiRequest(requestData) {
    // Perform the API request using the provided data
    // Replace this with your actual code to send the API request
  
    // For testing purposes, log the requestData to the console
    console.log(requestData);
  }