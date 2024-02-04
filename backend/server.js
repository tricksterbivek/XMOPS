const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;  

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// An endpoint for testing that the server is running
app.get('/ping', (req, res) => {
  return res.send('pong');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
