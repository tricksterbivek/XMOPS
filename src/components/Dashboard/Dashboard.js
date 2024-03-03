import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDatabase, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'; 

const Dashboard = () => {
    const deployedCounts = {
        lightsail: 5,
        monolith: 3,
        highlyAvailable: 7,
    };

    return (
        <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-cards">
                {/* LightSail Card */}
                <div className="card lightsail">
                    <FontAwesomeIcon icon={faCloud} size="3x" />
                    <h2>AWS LightSail</h2>
                    <div className="deployment-count">Deployments: {deployedCounts.lightsail}</div>
                </div>

                {/* Monolith Card */}
                <div className="card monolith">
                    <FontAwesomeIcon icon={faDatabase} size="3x" />
                    <h2>AWS monolith</h2>
                    <div className="deployment-count">Deployments: {deployedCounts.monolith}</div>
                </div>

                {/* Highly Available Card */}
                <div className="card highly-available ">
                    <FontAwesomeIcon icon={faNetworkWired} size="3x" />
                    <h2>AWS highly-available </h2>
                    <div className="deployment-count">Deployments: {deployedCounts.highlyAvailable}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
