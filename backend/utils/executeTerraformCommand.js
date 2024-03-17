const { exec } = require('child_process');

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

module.exports = executeTerraformCommand;