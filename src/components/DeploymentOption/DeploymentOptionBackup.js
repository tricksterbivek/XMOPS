import React, { useState, useEffect } from 'react';
import './DeploymentOption.css';
import logoSpinner from '../../logo.png';

const DeploymentOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    // Fetch available AWS regions when the component mounts
    fetch('/api/regions')
      .then(response => response.json())
      .then(data => {
        setRegions(data.regions || []);
        if (data.regions.length > 0) {
          setSelectedRegion(data.regions[0].regionName); // Default to the first region
        }
      })
      .catch((error) => {
        console.error('Error fetching regions:', error);
      });
  }, []);

  const deploy = (apiPath) => {
    setIsLoading(true);
    fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ region: selectedRegion }),
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
      <div className="regionSelect">
        <label htmlFor="region">Select Region:</label>
        <select id="region" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} disabled={isLoading}>
          {regions.map((region, index) => (
            <option key={index} value={region.regionName}>{region.regionName}</option>
          ))}
        </select>
      </div>
      <div className="buttonGroup">
        <button className="button" onClick={() => deploy('/api/deployLightSail')} disabled={isLoading || !selectedRegion}>
          {isLoading ? <span className="spinner"></span> : "Deploy LightSail"}
        </button>
        <button className="button" onClick={() => destroy('/api/destroyLightSail')} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Destroy LightSail"}
        </button>
        {/* Other buttons remain unchanged */}
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
