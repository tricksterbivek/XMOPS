const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));

const executeTerraformCommand = (command, cwd, successMessage, res) => {
  exec(command, { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ message: `Error executing Terraform command: ${stderr}` });
    }
    console.log(`stdout: ${stdout}`);
    if (command.includes('apply')) {
     
      exec('terraform output -json', { cwd }, (outputError, outputStdout, outputStderr) => {
        if (outputError) {
          console.error(`exec error: ${outputError}`);
          return res.status(500).send({ message: `Error executing Terraform output command: ${outputStderr}` });
        }
        try {
          const outputs = JSON.parse(outputStdout);
          const ip = outputs.instance_ip.value; 
          res.send({ message: successMessage, ip: ip });
        } catch (parseError) {
          console.error(`Error parsing Terraform output: ${parseError}`);
          res.status(500).send({ message: 'Error parsing Terraform output' });
        }
      });
    } else {
      res.send({ message: successMessage });
    }
  });
};

app.post('/api/deployMonolith', (req, res) => {
  executeTerraformCommand(
    'terraform apply -auto-approve',
    '../../Terraform/monolith/',
    'Monolith deployed successfully',
    res
  );
});

app.post('/api/destroyMonolith', (req, res) => {
  executeTerraformCommand(
    'terraform destroy -auto-approve',
    '../../Terraform/monolith/',
    'Monolith destroyed successfully',
    res
  );
});

app.post('/api/deployLightSail', (req, res) => {
  executeTerraformCommand(
    'terraform apply -auto-approve',
    '../LightSail/',
    'LightSail deployed successfully',
    res
  );
});

app.post('/api/destroyLightSail', (req, res) => {
  executeTerraformCommand(
    'terraform destroy -auto-approve',
    '../LightSail/',
    'LightSail destroyed successfully',
    res
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
