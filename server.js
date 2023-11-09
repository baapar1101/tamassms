const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = `.${parsedUrl.pathname}`;

  if (req.method === 'GET' && req.url === '/send-sms') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const requestData = JSON.parse(body);

        // Simulate sending SMS for each recipient
        const sendResults = [];
        requestData.Recipients.forEach(recipient => {
          const result = {
            Destination: recipient.Destination,
            Status: 'Sent' // Simulate success
            // You can set different statuses based on the actual response from the SMS service
          };
          sendResults.push(result);
        });

        const response = {
          message: 'SMS sent successfully',
          sendResults: sendResults
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error in JSON data');
      }
    });
  } else {
    if (pathname === './') {
      pathname = './index.html'; // Set default file to serve
    }

    const ext = path.parse(pathname).ext;
    let contentType = 'text/html';

    switch (ext) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
    }

    fs.readFile(pathname, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data, 'utf-8');
      }
    });
  }
});

const port = 8000; // Set the port you want the server to listen on
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
