import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../auth/CognitoConfig';

const VerifyOTP = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
   
    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        user.confirmRegistration(otp, true, (err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            alert("Verification successful!");
            navigate("/")
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
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
            </form>
        </div>
    );
};

export default VerifyOTP;
