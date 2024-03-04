import React from 'react';
import './DeploymentHistory.css';

const DeploymentHistory = () => {
  const deploymentHistories = [
    { architecture: "LightSail", date: "2023-03-01", status: "Pass" },
    { architecture: "Monolith", date: "2023-03-02", status: "Fail" },
    { architecture: "Highly Available", date: "2023-03-03", status: "Pass" },

  ];

  return (
    <div className="deployment-history">
      <h2>Deployment History</h2>
      <table>
        <thead>
          <tr>
            <th>Architecture</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deploymentHistories.map((history, index) => (
            <tr key={index}>
              <td>{history.architecture}</td>
              <td>{history.date}</td>
              <td className={history.status === "Pass" ? "pass" : "fail"}>{history.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentHistory;
