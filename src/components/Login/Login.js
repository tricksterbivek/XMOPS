import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../auth/CognitoConfig'
import './Login.css'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = event => {
        event.preventDefault();

        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authenticationData = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authenticationData, {
            onSuccess: (session) => {
                console.log('Login successful', session);
            },
            onFailure: (err) => {
                console.error('Login failed', err);
            },
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                value={email}
                onChange={event => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
            />
            <input 
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
