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
              
                navigate('/dashboard');
            },
            onFailure: err => {
                console.error('onFailure:', err);
                alert("Login Failed: " + err.message || JSON.stringify(err));
            },
            newPasswordRequired: data => {
                console.log('newPasswordRequired:', data);
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
            
        </form>
    );
};

export default LoginPage;
