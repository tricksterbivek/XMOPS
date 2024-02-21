import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import logo from '../../logoWhole.png'

import logoSpinner from '../../logo.png'; 




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = event => {
    event.preventDefault();
    setLoading(true);

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('onSuccess:', data);
        navigate('/dashboard');
        setLoading(false);
        toast.success('Logged in successfully');
      },
      onFailure: err => {
        console.error('onFailure:', err);
        setLoading(false);
        toast.error(`Login Failed: ${err.message || JSON.stringify(err)}`);
      },
      newPasswordRequired: data => {
        console.log('newPasswordRequired:', data);
        setLoading(false);
        // Optionally handle newPasswordRequired scenario here
      },
    });
  };

  return (
    <>
    
      <div className="login-page-container">
    <img src={logo} alt="Brand Logo" className="login-logo" />
      <ToastContainer position="bottom-center" />
      <div className="login-wrapper">
        <form onSubmit={onSubmit} className="login-container">
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit">Login</button>
          {loading && (
  <div className="spinner-overlay">
    <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
  </div>
)}

        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      </div>
    </>
  );
};

export default LoginPage;
