
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
const Dashboard = () => {
  

    const user = {
        name: 'TAP USER ',
        email: 'TAP@swin.edu.au',
       
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            
            <div className="dashboard-tiles">
                <div className="tile">
                    <h2>Deployment Options</h2>
                    <p>Start a new deployment or configure existing ones.</p>
                    <Link to="/deploy">Go to Deployment Options</Link>
                </div>
                
                <div className="tile">
                    <h2>Deployment History</h2>
                    <p>Review the history of your deployments.</p>
                    <Link to="/history">View Deployment History</Link>
                </div>
                
                <div className="tile">
                    <h2>Settings</h2>
                    <p>Manage your account and application settings.</p>
                    <Link to="/settings">Go to Settings</Link>
                </div>
                
                <div className="tile user-info">
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  
                </div>
            </div>
        </div>
    );
};

export default Dashboard;