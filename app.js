const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const app = express();
const fetch = require('node-fetch');
const path = require('path');


dotenv.config();

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Require route files
const timeRoutes = require('./routes/timeRoutes');
const addSubtractRoutes = require('./routes/addSubtractRoutes');
const convertRoutes = require('./routes/convertRoutes');

// Use routes
app.use('/time-between', timeRoutes);
app.use('/add-subtract', addSubtractRoutes);
app.use('/convert', convertRoutes);

// Serve index.html file when /live endpoint is accessed
app.get('/live', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket client connected'); // Added console log here
  
  ws.on('message', function incoming(message) {
    console.log('Received:', message);

    // Parse the received message
    const request = JSON.parse(message);
    const { api, payload } = request;

    // Route the request to the appropriate API handler
    switch(api) {
      case 'time-between':
        handleTimeBetween(payload, ws);
        break;
      case 'add-subtract':
        handleAddSubtract(payload, ws);
        break;
      case 'convert':
        handleConvert(payload, ws);
        break;
      default:
        console.log('Invalid API');
    }
  });
});
    
    // Start server
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define WebSocket message handlers
async function handleTimeBetween(payload, ws) {
  try {
    console.log("THE TIME-B/W FUNCTION WAS CALLED")
    // Make a POST request to the '/time-between' endpoint of your backend API
    const response = await fetch('http://localhost:5000/time-between', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) // Send the payload data
    });

    // Parse the JSON response from the backend API
    const data = await response.json();
    console.log("RESPONSE FROM BACKEND:", data)

    // Send the response back to the WebSocket client
    ws.send(JSON.stringify(data));
  } catch (error) {
    console.error('Error handling time-between:', error);
    // Send an error message back to the WebSocket client
    ws.send(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

async function handleAddSubtract(payload, ws) {
  try {
    console.log("THE ADD SUBTRACT FUNCTION WAS CALLED")
    // Make a POST request to the '/add-subtract' endpoint of your backend API
    const response = await fetch('http://localhost:5000/add-subtract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) // Send the payload data
    });

    // Parse the JSON response from the backend API
    const data = await response.json();

    // Send the response back to the WebSocket client
    ws.send(JSON.stringify(data));
  } catch (error) {
    console.error('Error handling add-subtract:', error);
    // Send an error message back to the WebSocket client
    ws.send(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

async function handleConvert(payload, ws) {
  try {
    console.log("THE CONVERT FUNCTION WAS CALLED")
    // Make a POST request to the '/convert' endpoint of your backend API
    const response = await fetch('http://localhost:5000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) // Send the payload data
    });

    // Parse the JSON response from the backend API
    const data = await response.json();

    // Send the response back to the WebSocket client
    ws.send(JSON.stringify(data));
  } catch (error) {
    console.error('Error handling convert:', error);
    // Send an error message back to the WebSocket client
    ws.send(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
