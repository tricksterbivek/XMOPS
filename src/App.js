import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import VerifyAccount from './components/VerifiyAccount/verifyAccount'; // Import your VerifyAccount component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyAccount" element={<VerifyAccount />} /> // Add this line
      </Routes>
    </Router>
  );
}

export default App;
