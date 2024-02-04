// Dashboard.js or your relevant component file
import React from 'react';
import './Dashboard.css'
function Dashboard() {
  const handleDeployEC2 = () => {
    fetch('/api/deployEC2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
  };

  const handleDestroyEC2 = () => {
    fetch('/api/destroyEC2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <button className="dashboard-button" onClick={handleDeployEC2}>Deploy EC2</button>
      <button className="dashboard-button" onClick={handleDestroyEC2}>Destroy EC2</button>
    </div>
  );
}

export default Dashboard;