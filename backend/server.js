const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));

// app.get('/ping', (req, res) => {
//   return res.send('pong');
// });

// app.post('/api/action', (req, res) => {
//   console.log('Action button was clicked!');
//   res.json({ message: 'Action was successfully triggered' });
// });


app.post('/api/deployEC2', (req, res) => {
  exec('terraform apply -auto-approve', { cwd: '../terraform/' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: 'Error executing Terraform apply' });
    }
    console.log(`stdout: ${stdout}`);
    res.send({ message: 'EC2 Instance deployed successfully' });
  });
});


app.post('/api/destroyEC2', (req, res) => {
  exec('terraform destroy -auto-approve', { cwd: '../terraform/' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: 'Error executing Terraform destroy' });
    }
    console.log(`stdout: ${stdout}`);
    res.send({ message: 'EC2 Instance destroyed successfully' });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
