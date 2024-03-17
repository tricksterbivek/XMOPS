import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Make sure you have this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faRocket, faHistory, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo.png';

const Sidebar = ({ signOut, user }) => {
    return (
        <nav className="sidebar">
             <div className="sidebar-header">
                <img src={logo} alt="Brand Logo" className="sidebar-logo" />
            </div>
            <ul className="sidebar-nav">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                       Dashboard  <FontAwesomeIcon icon={faTachometerAlt} className='fa-icon' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/deployment-options" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Deployment Form <FontAwesomeIcon icon={faRocket} className='fa-icon' /> 
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Deployment History <FontAwesomeIcon icon={faHistory}  className='fa-icon'/> 
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Settings   <FontAwesomeIcon icon={faCog} className='fa-icon' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user-profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    User Profile  <FontAwesomeIcon icon={faUser} className='fa-icon' /> 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a onClick={signOut} className="nav-link" style={{cursor: 'pointer'}}>
                        Sign Out <FontAwesomeIcon icon={faSignOutAlt} className='fa-icon' />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
