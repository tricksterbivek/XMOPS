const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const executeTerraformCommand = require('../utils/executeTerraformCommand');
const ec2 = new AWS.EC2();

// Get available regions
router.get('/monolith-regions', (req, res) => {
  ec2.describeRegions({}, (err, data) => {
    if (err) {
      console.error('Error fetching regions:', err);
      res.status(500).json({ error: 'Failed to fetch regions' });
    } else {
      const regions = data.Regions.map(region => ({
        regionName: region.RegionName,
        displayName: region.RegionName, // You can customize the display name as needed
      }));
      res.json({ regions });
    }
  });
});

// Get available images
router.get('/monolith-images', (req, res) => {
  const region = req.query.region;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  const regionalEC2 = new AWS.EC2({ region });

  const params = {
    Filters: [
      {
        Name: 'is-public',
        Values: ['true'],
      },
      {
        Name: 'state',
        Values: ['available'],
      },
    ],
    MaxResults: Math.min(limit, 10),
    NextToken: null,
  };

  if (page > 1) {
    params.NextToken = (page - 1) * limit;
  }

  regionalEC2.describeImages(params, (err, data) => {
    if (err) {
      console.error('Error fetching EC2 images:', err);
      return res.status(500).json({ error: 'Failed to fetch EC2 images' });
    }

    const linuxImages = data.Images.filter((image) => image.PlatformDetails.toLowerCase().includes('linux/unix'));
    const limitedImages = linuxImages.slice(0, Math.min(limit, 10));
    const nextPage = data.NextToken && linuxImages.length > limit ? page + 1 : null;

    res.json({
      images: limitedImages,
      currentPage: page,
      nextPage,
    });
  });
});

// Get available instance types
router.get('/monolith-instanceTypes', (req, res) => {
  const region = req.query.region;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  const regionalEC2 = new AWS.EC2({ region });

  regionalEC2.describeInstanceTypes({}, (err, data) => {
    if (err) {
      console.error('Error fetching instance types:', err);
      res.status(500).json({ error: 'Failed to fetch instance types' });
    } else {
      const allowedInstanceTypes = [
        't1.micro',
        't2.nano', 't2.micro', 't2.small', 't2.medium', 't2.large', 't2.xlarge', 't2.2xlarge',
        't3.nano', 't3.micro', 't3.small', 't3.medium', 't3.large', 't3.xlarge', 't3.2xlarge',
        't3a.nano', 't3a.micro', 't3a.small', 't3a.medium', 't3a.large', 't3a.xlarge', 't3a.2xlarge',
        't4g.nano', 't4g.micro', 't4g.small', 't4g.medium', 't4g.large', 't4g.xlarge', 't4g.2xlarge'
      ];

      const filteredInstanceTypes = data.InstanceTypes.filter(instanceType =>
        allowedInstanceTypes.includes(instanceType.InstanceType)
      );

      const instanceTypes = filteredInstanceTypes.map(instanceType => ({
        instanceType: instanceType.InstanceType,
      }));

      res.json({
        instanceTypes,
      });
    }
  });
});
// ... (routes for other data fetching)

// Route for deployment
router.get('/monolith-dbTypes', (req, res) => {
  const region = req.query.region;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  // Define the available DB types for WordPress deployment
  const dbTypes = [
    { dbType: 'mysql' },
    { dbType: 'mariadb' },
  ];

  res.json({
    dbTypes,
  });
});

// Get available PHP versions
router.get('/monolith-phpVersions', (req, res) => {
  const region = req.query.region;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  // Define the available PHP versions for WordPress deployment
  const phpVersions = [
    { version: '7.4' },
    { version: '8.0' },
    { version: '8.1' },
  ];

  res.json({
    phpVersions,
  });
});

// Get available web server options
router.get('/monolith-webServerOptions', (req, res) => {
  const region = req.query.region;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  // Define the available web server options for WordPress deployment
  const webServerOptions = [
    { webServer: 'apache' },
    { webServer: 'nginx' },
  ];

  res.json({
    webServerOptions,
  });
});

// Route for deployment
router.post('/deployMonolith', express.json(), (req, res) => {
  const {
    region,
    image,
    instanceType,
    securityGroupSettings,
    storageSize,
    dbType,
    phpVersion,
    webServer,
  } = req.body;

  const terraformApplyCommand = `terraform apply -auto-approve ` +
    `-var="region=${region}" ` +
    `-var="image=${image}" ` +
    `-var="instance_type=${instanceType}" ` +
    `-var="allow_ssh=${securityGroupSettings.allowSSH}" ` +
    `-var="allow_http=${securityGroupSettings.allowHTTP}" ` +
    `-var="storage_size=${storageSize}" ` +
    `-var="db_type=${dbType}" ` +
    `-var="php_version=${phpVersion}" ` +
    `-var="web_server=${webServer}"`;

  executeTerraformCommand(
    terraformApplyCommand,
    '../../Terraform/monolith/',
    'WordPress deployed successfully on monolithic architecture',
    res
  );
});

// Route for destruction
router.post('/destroyMonolith', (req, res) => {
  executeTerraformCommand(
    'terraform destroy -auto-approve',
    '../../Terraform/monolith/',
    'WordPress monolithic deployment destroyed successfully',
    res
  );
});

module.exports = router;