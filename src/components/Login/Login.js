<<<<<<< HEAD
import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../auth/CognitoConfig";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (event) => {
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
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        navigate("/dashboard");
        setLoading(false); 
        toast.success("Logged in successfully"); 
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        setLoading(false);
        toast.error(`Login Failed: ${err.message || JSON.stringify(err)}`);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
        setLoading(false);
      },
    });
  };

  return (
    <>
      <ToastContainer position="bottom-center" />

      <div className="login-wrapper">
        <form onSubmit={onSubmit} className="login-container">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit">Login</button>
=======
import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const onSubmit = event => {
        event.preventDefault();
    
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });
    
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });
    
        user.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log('onSuccess:', data);
                // Redirect to dashboard page on successful login with useNavigate
                navigate('/dashboard');
            },
            onFailure: err => {
                console.error('onFailure:', err);
                alert("Login Failed: " + err.message || JSON.stringify(err));
            },
            newPasswordRequired: data => {
                console.log('newPasswordRequired:', data);
                // Handle newPasswordRequired scenario, possibly redirect or prompt user for a new password
            }
        });
    };
    return (
        <form onSubmit={onSubmit}>
            <input
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email"
            />
            <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
            />
             <button type="submit">Login</button>
        <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
            
>>>>>>> 817a0e9d284b50eab56823892b5c11eded818f8a
        </form>
        {loading && (
          <div className="spinner-overlay">
            <ClipLoader color="#3498db" loading={loading} size={150} />
          </div>
        )}
      </div>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
};

export default LoginPage;
