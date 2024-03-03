// Assuming this is in components/Layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust this import based on the actual location

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Outlet /> {/* This renders the matched child route */}
      </div>
    </div>
  );
};

export default Layout;
