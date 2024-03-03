import React from 'react';
import './NotFound.css'; // Make sure you have this CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Oops!</h1>
        <p className="not-found-message">We can't seem to find the page you're looking for.</p>
        <a href="/dashboard" className="not-found-home-link">Go back home</a>
      </div>
    </div>
  );
};

export default NotFound;
