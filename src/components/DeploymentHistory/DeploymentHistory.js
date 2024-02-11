import React, { useState } from 'react';
import './DeploymentOption.css';

const DeploymentOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  const handleDeployClick = () => {
    setIsLoading(true); // Start loading
    fetch('/api/deployWP', {
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
      alert('Error deploying Wordpress');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleDestroyClick = () => {
    setIsLoading(true);
    fetch('/api/destroyWP', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      setIpAddress(''); 
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error destroying Wordpress');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="deploymentOptions">
      <h2>Deployment Options</h2>
      <button className="button" onClick={handleDeployClick} disabled={isLoading}>
        {isLoading ? <span className="spinner"></span> : "Deploy WordPress"}
      </button>
      <button className="button" onClick={handleDestroyClick} disabled={isLoading}>
        {isLoading ? <span className="spinner"></span> : "Destroy WordPress"}
      </button>
      {ipAddress && <p>Access your WordPress site at: <a href={`http://${ipAddress}`} target="_blank" rel="noopener noreferrer">{ipAddress}</a></p>}
      {isLoading && <p className="loadingText">Please wait...</p>}
    </div>
  );
};



export default DeploymentOptions;
