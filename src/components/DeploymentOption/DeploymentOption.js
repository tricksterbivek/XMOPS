import React, { useState } from 'react';
import './DeploymentOption.css';
import logoSpinner from '../../logo.png';
const DeploymentOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  const deploy = (apiPath) => {
    setIsLoading(true);
    fetch(apiPath, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      if (data.ip) {
        setIpAddress(data.ip);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(`Error during operation`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const destroy = (apiPath) => {
    setIsLoading(true);
    fetch(apiPath, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      setIpAddress(''); 
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error during operation');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="deploymentOptions">
      <h2>Deployment Options</h2>
      <div className="buttonGroup">
       
        <button className="button" onClick={() => deploy('/api/deployLightSail')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Deploy LightSail"}
        </button>
        <button className="button" onClick={() => destroy('/api/destroyLightSail')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Destroy LightSail"}
        </button>
        <button className="button" onClick={() => deploy('/api/deployMonolith')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Deploy Monolith"}
        </button>
        <button className="button" onClick={() => destroy('/api/destroyMonolith')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Destroy Monolith"}
        </button>
        <button className="button" onClick={() => deploy('/api/deployMicroService')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Deploy MicroService"}
        </button>
        <button className="button" onClick={() => destroy('/api/destroyMicroService')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Destroy MicroService"}
        </button>
      </div>
      {ipAddress && <p>Access your site at: <a href={`http://${ipAddress}`} target="_blank" rel="noopener noreferrer">{ipAddress}</a></p>}
      {isLoading && (
  <div className="spinner-overlay">
    <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
  </div>
)}

    </div>
  );
};



export default DeploymentOptions;
