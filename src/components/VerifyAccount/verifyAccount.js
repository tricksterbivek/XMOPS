import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';
import './verifyAccount.css'; // Ensure you have this CSS file for styling
import logo from '../../logoWhole.png'; // Your brand logo
import logoSpinner from '../../logo.png'; // Your spinner logo
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        user.confirmRegistration(otp, true, (err, result) => {
            setLoading(false); // Stop loading
            if (err) {
                toast.error(err.message || JSON.stringify(err));
                return;
            }
            toast.success("Verification successful!");
            navigate('/');
        });
    };

    return (
        <>
            <div className="verify-otp-container">
                <img src={logo} alt="Brand Logo" className="verify-otp-logo" />
                <ToastContainer position="bottom-center" />
                <div className="verify-otp-wrapper">
                    <form onSubmit={onSubmit} className="verify-otp-form">
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                            readOnly
                        />
                        <input
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            placeholder="OTP"
                        />
                        <button type="submit">Verify OTP</button>
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

export default VerifyOTP;
