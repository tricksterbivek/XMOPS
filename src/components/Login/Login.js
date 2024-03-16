import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';
import './Login.css'; // Ensure this is pointing to your updated CSS file
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../logoWhole.png';
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
        navigate('/dashboard');
        setLoading(false);
        toast.success('Logged in successfully');
      },
      onFailure: err => {
        setLoading(false);
        toast.error(`Login Failed: ${err.message || JSON.stringify(err)}`);
      },
      newPasswordRequired: data => {
        setLoading(false);
      },
    });
  };

  return (
    <>
    
    <div className="login-page">
        <ToastContainer position="bottom-center" />
        {loading && (
          <div className="spinner-overlay">
            <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
          </div>
        )}
       
        <div className="login-form">
        <img src={logo} alt="Brand Logo" className="login-logo" />  
          <form onSubmit={onSubmit}>
            <div className="input-field">
              <input
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="input-field">
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <img src={logoSpinner} alt="Loading..." className="button-spinner" /> : 'Login'}
            </button>
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
