const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());


const lightsailRoutes = require('./routes/lightsail');
const monolithRoutes = require('./routes/monolith');


// Use routes
app.use('/api', lightsailRoutes);
app.use('/api', monolithRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});