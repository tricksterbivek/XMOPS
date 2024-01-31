    import React, { useState } from 'react';
    import { CognitoUser } from 'amazon-cognito-identity-js';
    import UserPool from '../../auth/CognitoConfig';

    const VerifyOTP = () => {
        const [email, setEmail] = useState('');
        const [otp, setOtp] = useState('');

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
            
            });
        };

        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
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
