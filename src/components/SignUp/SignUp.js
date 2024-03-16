import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../../auth/CognitoConfig';
import './SignUp.css'
import logo from '../../logoWhole.png'; // Your brand logo
import logoSpinner from '../../logo.png'; // Your spinner logo
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = event => {
        event.preventDefault();
        setLoading(true); 

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'name',
                Value: name
            }),
        ];

        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.error(err);
                toast.error(`Signup Failed: ${err.message || JSON.stringify(err)}`);
                return;
            }
            console.log('User registration successful:', result);
        navigate('/verifyAccount', { state: { email: email } });
        toast.success('Signup successful. Please verify your account.');

        });
    };

    return (
        <>
            <div className="signup-page">
                <img src={logo} alt="Brand Logo" className="signup-logo" />
                <ToastContainer position="bottom-center" />
                <div className="signup-wrapper">
                    <form onSubmit={onSubmit} className="signup-form">
                    <h2>Sign Up</h2>
                <div className="input-field">
                        <input
                            value={name}
                            onChange={event => setName(event.target.value)}
                            placeholder="Name"
                        />
                             </div>
                <div className="input-field">
                        <input
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Email"
                            type="email"
                        />
                             </div>
                <div className="input-field">
                        <input
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            placeholder="Password"
                            type="password"
                        />
                                        </div>

                        <button type="submit" className="signup-button" >Sign Up</button>
                        {loading && (
                            <div className="spinner-overlay">
                                <img src={logoSpinner} alt="Loading..." className="logo-spinner" />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
    
};

export default SignUpPage;
