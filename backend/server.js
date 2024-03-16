const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;
const AWS = require('aws-sdk');

app.use(express.static(path.join(__dirname, '..', 'build')));
AWS.config.update({
  region: 'ap-southeast-2',
});

const lightSail = new AWS.Lightsail();
app.use(express.json());

app.get('/api/lightsail-regions', (req, res) => {
  lightSail.getRegions({}, (err, data) => {
    if (err) {
      console.log(err, err.stack); 
      res.status(500).send({message: "Failed to fetch regions"});
    } else {
      console.log(data);         
      res.send({regions: data.regions.map(region => ({regionName: region.name, displayName: region.displayName}))});
    }
  });
});

app.get('/api/lightsail-availabilityZones', (req, res) => {
  let region = req.query.region;
  let regionalLightSail = new AWS.Lightsail({
    region: region
  });

  regionalLightSail.getRegions({ includeAvailabilityZones: true }, (err, data) => {
    if (err) {
      console.error("AWS Error:", err); // Log the detailed error message
      res.status(500).send({ message: "Fail to fetch availability zones", error: err.message });
    
    } else {
      const regionData = data.regions.find(r => r.name === region);
      if (!regionData) {
        res.status(404).send({ message: "Region not found" });
      } else {
        const zones = regionData.availabilityZones;
        res.send({ availabilityZones: zones });
      }
    }
  });
})
 


app.get('/api/lightsail-blueprints', (req, res) => {
  let region = req.query.region;
  if (!region) {
    return res.status(400).send({ message: "Region is required" });
  }

  let regionalLightSail = new AWS.Lightsail({
    region: region
  });

  regionalLightSail.getBlueprints({}, (err, data) => {
    if (err) {res.status(500).send({ message: "Failed to fetch blueprints" });}
    else { res.send({ blueprints: data.blueprints }); } 
  });
});


app.get('/api/lightsail-bundles', (req, res) => {
  let region = req.query.region;
  if (!region) {
    return res.status(400).send({ message: "Region is required" });
  }

  let regionalLightSail = new AWS.Lightsail({
    region: region
  });

  regionalLightSail.getBundles({}, (err, data) => {
    if (err) {
      console.error("Error fetching bundles:", err);
      res.status(500).send({ message: "Failed to fetch bundles", error: err.message });
    } else {
      res.send({ bundles: data.bundles });
    }
  });
});


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

app.post('/api/deployLightSail', express.json(), (req, res) => {
  const {
    region,
    instance_availability_zone,
    instance_blueprintid,
    instance_bundleid, 
    static_ip,
    static_ip_attachment,
  } = req.body;

  const terraformApplyCommand = `terraform apply -auto-approve ` +
    `-var="region=${region}" ` +
    `-var="instance_availability_zone=${instance_availability_zone}" ` +
    `-var="instance_blueprintid=${instance_blueprintid}" ` +
    `-var="instance_bundleid=${instance_bundleid}" ` +
    `-var="static_ip=${static_ip}" ` +
    `-var="static_ip_attachment=${static_ip_attachment}"`;

  executeTerraformCommand(
    terraformApplyCommand,
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
