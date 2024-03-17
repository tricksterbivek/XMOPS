import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logoSpinner from '../../../logo.png';
import './Monolith.css';

const MonolithPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [images, setImages] = useState([]);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [dbTypes, setDbTypes] = useState([]);
  const [phpVersions, setPhpVersions] = useState([]);
  const [webServerOptions, setWebServerOptions] = useState([]);
  const [instanceDetails, setInstanceDetails] = useState({
    region: '',
    image: '',
    instanceType: '',
    securityGroupSettings: {
      allowSSH: false,
      allowHTTP: false,
    },
    storageSize: 0,
    dbType: '',
    phpVersion: '',
    webServer: '',
  });

  useEffect(() => {
    fetch('/api/monolith-regions')
      .then((response) => response.json())
      .then((data) => {
        console.log('This is the region data');
        console.log(data);
        setRegions(data.regions || []);
        if (data.regions && data.regions.length > 0) {
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            region: data.regions[0].regionName,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching regions:', error);
      });
  }, []);

  useEffect(() => {
    const fetchRegionSpecificData = async () => {
      setIsLoading(true);
      if (instanceDetails.region) {
        try {
          const imageResponse = await fetch(`/api/monolith-images?region=${instanceDetails.region}`);
          const imageData = await imageResponse.json();
          console.log(imageData);
          setImages(imageData.images || []);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            image: imageData.images[0]?.imageId || '',
          }));

          const instanceTypeResponse = await fetch(`/api/monolith-instanceTypes?region=${instanceDetails.region}`);
          const instanceTypeData = await instanceTypeResponse.json();
          console.log(instanceTypeData);
          setInstanceTypes(instanceTypeData.instanceTypes || []);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            instanceType: instanceTypeData.instanceTypes[0]?.instanceType || '',
          }));

          const dbTypeResponse = await fetch(`/api/monolith-dbTypes?region=${instanceDetails.region}`);
          const dbTypeData = await dbTypeResponse.json();
          console.log(dbTypeData);
          setDbTypes(dbTypeData.dbTypes || []);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            dbType: dbTypeData.dbTypes[0]?.dbType || '',
          }));

          const phpVersionResponse = await fetch(`/api/monolith-phpVersions?region=${instanceDetails.region}`);
          const phpVersionData = await phpVersionResponse.json();
          console.log(phpVersionData);
          setPhpVersions(phpVersionData.phpVersions || []);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            phpVersion: phpVersionData.phpVersions[0]?.version || '',
          }));

          const webServerResponse = await fetch(`/api/monolith-webServerOptions?region=${instanceDetails.region}`);
          const webServerData = await webServerResponse.json();
          console.log(webServerData);
          setWebServerOptions(webServerData.webServerOptions || []);
          setInstanceDetails((prevDetails) => ({
            ...prevDetails,
            webServer: webServerData.webServerOptions[0]?.webServer || '',
          }));
        } catch (error) {
          console.error('Failed to fetch region-specific data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchRegionSpecificData();
  }, [instanceDetails.region]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstanceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSecurityGroupSettingsChange = (e) => {
    const { name, checked } = e.target;
    setInstanceDetails((prevDetails) => ({
      ...prevDetails,
      securityGroupSettings: {
        ...prevDetails.securityGroupSettings,
        [name]: checked,
      },
    }));
  };

  const handleStorageSizeChange = (e) => {
    const { value } = e.target;
    setInstanceDetails((prevDetails) => ({
      ...prevDetails,
      storageSize: value,
    }));
  };

  const handleDeploy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/deployMonolith', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instanceDetails),
      });

      if (response.ok) {
        console.log('Monolith deployed successfully');
        // Handle success, show a success message, or redirect to a success page
      } else {
        console.error('Error deploying monolith');
        // Handle error, show an error message
      }
    } catch (error) {
      console.error('Error deploying monolith:', error);
      // Handle error, show an error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestroy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/destroyMonolith', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Monolith destroyed successfully');
        // Handle success, show a success message, or perform any necessary actions
      } else {
        console.error('Error destroying monolith');
        // Handle error, show an error message
      }
    } catch (error) {
      console.error('Error destroying monolith:', error);
      // Handle error, show an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="monolith-page">
      <button onClick={() => navigate("/deployment-options")} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="header">
        <FontAwesomeIcon icon={faDatabase} className="icon" />
        <h1>Monolith Architecture Deployments</h1>
      </div>
      <div className="content">
        <p>
          Monolithic architecture is a traditional method of building applications as a single unit. All components are interconnected and interdependent.
        </p>
        <h2>Deployment Options</h2>
        <div className="form-group">
          <label htmlFor="region">AWS Region:</label>
          <select
            id="region"
            name="region"
            value={instanceDetails.region}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            {regions.map((region) => (
              <option key={region.regionName} value={region.regionName}>
                {region.displayName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (OS):</label>
          <select
            id="image"
            name="image"
            value={instanceDetails.image}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select an image</option>
            {images.map((image) => (
              <option key={image.ImageId} value={image.ImageId}>
                {image.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="instanceType">Instance Type:</label>
          <select
            id="instanceType"
            name="instanceType"
            value={instanceDetails.instanceType}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select an instance type</option>
            {instanceTypes.map((instanceType) => (
              <option key={instanceType.instanceType} value={instanceType.instanceType}>
                {instanceType.instanceType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Security Group Settings:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="allowSSH"
                checked={instanceDetails.securityGroupSettings.allowSSH}
                onChange={handleSecurityGroupSettingsChange}
                disabled={isLoading}
              />
              Allow SSH
            </label>
            <label>
              <input
                type="checkbox"
                name="allowHTTP"
                checked={instanceDetails.securityGroupSettings.allowHTTP}
                onChange={handleSecurityGroupSettingsChange}
                disabled={isLoading}
              />
              Allow HTTP
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="storageSize">Storage Size (GiB):</label>
          <input
            type="number"
            id="storageSize"
            name="storageSize"
            value={instanceDetails.storageSize}
            onChange={handleStorageSizeChange}
            min="0"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dbType">DB Type:</label>
          <select
            id="dbType"
            name="dbType"
            value={instanceDetails.dbType}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select a DB type</option>
            {dbTypes.map((dbType) => (
              <option key={dbType.dbType} value={dbType.dbType}>
                {dbType.dbType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phpVersion">PHP Version:</label>
          <select
            id="phpVersion"
            name="phpVersion"
            value={instanceDetails.phpVersion}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select a PHP version</option>
            {phpVersions.map((phpVersion) => (
              <option key={phpVersion.version} value={phpVersion.version}>
                {phpVersion.version}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="webServer">Web Server:</label>
          <select
            id="webServer"
            name="webServer"
            value={instanceDetails.webServer}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select a web server</option>
            {webServerOptions.map((webServer) => (
              <option key={webServer.webServer} value={webServer.webServer}>
                {webServer.webServer}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button onClick={handleDeploy} disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : 'Deploy Monolith'}
          </button>
          <button onClick={handleDestroy} disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : 'Destroy Monolith'}
          </button>
        </div>
        {isLoading && (
          <div className="spinner-overlay">
            <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonolithPage;