const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const executeTerraformCommand = require('../utils/executeTerraformCommand');

AWS.config.update({
  region: 'ap-southeast-2',
});

const lightSail = new AWS.Lightsail();

router.get('/lightsail-regions', (req, res) => {
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

router.get('/lightsail-availabilityZones', (req, res) => {
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
});

router.get('/lightsail-blueprints', (req, res) => {
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

router.get('/lightsail-bundles', (req, res) => {
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

router.post('/deployLightSail', express.json(), (req, res) => {
  const {
    region,
    availabilityZone, // Add this line to destructure the availabilityZone property
    platform,
    instancePlan,
  } = req.body;

  const terraformApplyCommand = `terraform apply -auto-approve ` +
    `-var="region=${region}" ` +
    `-var="instance_availability_zone=${availabilityZone}" ` + // Use the destructured availabilityZone
    `-var="instance_blueprintid=${platform}" ` +
    `-var="instance_bundleid=${instancePlan}"`;

  executeTerraformCommand(
    terraformApplyCommand,
    '../LightSail/',
    'LightSail deployed successfully',
    res
  );
});

router.post('/destroyLightSail', (req, res) => {
  executeTerraformCommand(
    'terraform destroy -auto-approve',
    '../LightSail/',
    'LightSail destroyed successfully',
    res
  );
});

module.exports = router;