import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./Monolith.css";

const MonolithPage = () => {
    const navigate = useNavigate();
  return (
    <div className="monolith-page">
      <button
        onClick={() => navigate("/deployment-options")}
        className="back-button"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="header">
        <FontAwesomeIcon icon={faDatabase} className="icon" />
        <h1>Monolith Architecture Deployments</h1>
      </div>
      <div className="content">
        <p>
          Monolithic architecture is a traditional method of building
          applications as a single unit. All components are interconnected and
          interdependent.
        </p>
        {/* Add more content and functionality as needed */}
      </div>
    </div>
  );
};

export default MonolithPage;
