import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './HighAvailiblity.css'; // Make sure you create a corresponding CSS file

const HighAvailiblity = () => {
    const navigate = useNavigate();
  return (
    <div className="highly-available-page">
          <button onClick={() => navigate('/deployment-options')} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="header">
        <FontAwesomeIcon icon={faNetworkWired} className="icon" />
        <h1>Highly Available Deployments</h1>
      </div>
      <div className="content">
        <p>
          Highly available architecture ensures that your application remains operational even if 
          some components fail. Redundancy and failover mechanisms are typically in place to handle potential outages.
        </p>
        {/* Add more content and functionality as needed */}
      </div>
    </div>
  );
};

export default HighAvailiblity;
