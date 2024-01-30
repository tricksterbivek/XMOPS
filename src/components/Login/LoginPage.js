import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
