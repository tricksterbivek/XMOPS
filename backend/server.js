const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));




app.post('/api/deployWP', (req, res) => {
  
  exec('terraform apply -auto-approve', { cwd: '../terraform/' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: 'Error executing Terraform apply' });
    }
    console.log(`stdout: ${stdout}`);
  
    exec('terraform output -json', { cwd: '../terraform/' }, (error, outputStdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send({ message: 'Error getting Terraform output' });
      }
  
      try {
        const outputs = JSON.parse(outputStdout);
        const ip = outputs.instance_public_ip.value;
        res.send({ message: 'EC2 Instance deployed successfully', ip: ip });
      } catch (parseError) {
        console.error(`Error parsing Terraform output: ${parseError}`);
        res.status(500).send({ message: 'Error parsing Terraform output' });
      }
    });
  });
});
app.post('/api/destroyWP', (req, res) => {
  exec('terraform destroy -auto-approve', { cwd: '../terraform/' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: 'Error executing Terraform destroy' });
    }
    console.log(`stdout: ${stdout}`);
    res.send({ message: 'Wordpress destroyed successfully' });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});