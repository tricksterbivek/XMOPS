import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust this import based on the actual location

const Layout = ({ signOut, user }) => {
  return (
    <div className="app-layout">
      <Sidebar signOut={signOut} user={user} />
      <div className="app-content">
        <Outlet /> {/* This renders the matched child route */}
      </div>
    </div>
  );
};

export default Layout;
