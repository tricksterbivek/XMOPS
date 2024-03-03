import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDatabase, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import './DeploymentOption.css';

const DeploymentOption = () => {
    return (
        <div className="deployment-option">
            <h1>Choose Your Deployment</h1>

            <div className="deployment-cards">
                <div className="card lightsail">
                    <FontAwesomeIcon icon={faCloud} size="3x" className="icon" />
                    <h2>AWS LightSail</h2>
                    <p>Optimized for WordPress, offering simplicity and cost efficiency.</p>
                    <Link to="/lightsail" className="deploy-link">Deploy Now</Link>
                </div>

                <div className="card monolith">
                    <FontAwesomeIcon icon={faDatabase} size="3x" className="icon" />
                    <h2>Monolith</h2>
                    <p>Traditional architecture, ideal for straightforward deployments.</p>
                    <Link to="/monolith" className="deploy-link">Deploy Now</Link>
                </div>

                <div className="card highly-available">
                    <FontAwesomeIcon icon={faNetworkWired} size="3x" className="icon" />
                    <h2>Highly Available</h2>
                    <p>Ensures uptime and scalability for your WordPress site.</p>
                    <Link to="/high-available" className="deploy-link">Deploy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default DeploymentOption;
