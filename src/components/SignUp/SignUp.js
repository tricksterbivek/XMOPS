import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../../auth/CognitoConfig';
import './SignUp.css'

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onSubmit = event => {
        event.preventDefault();


        const attributeList = [
            new CognitoUserAttribute({
                Name: 'name',
                Value: name
            }),
        ];

        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('User registration successful:', result);
            navigate('/verifyAccount', { state: { email: email } });

        });
    };


    return (
        <form onSubmit={onSubmit}>
            <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Name"
            />
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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpPage;
