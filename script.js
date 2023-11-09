document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var apiKey = document.getElementById('apiKey').value;
    var text = document.getElementById('text').value;
    var sender = document.getElementById('sender').value;
    var recipients = document.getElementById('recipients').value.split(',');
  
    var config = {
      method: 'get',
      url: `https://api.sms-webservice.com/api/V3/Send?ApiKey=${apiKey}&Text=${text}&Sender=${sender}&Recipients=${recipients.join(',')}`,
      headers: {}
    };
  
    axios(config)
      .then(function(response) {
        document.getElementById('response').innerText = JSON.stringify(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  