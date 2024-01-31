import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';
import './Login.css'
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
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
                alert("User Login SuccessFul")
            },
            onFailure: err => {
                console.error('onFailure:', err);
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
