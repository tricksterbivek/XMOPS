import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('./components/Login/Login'));
const SignUp = lazy(() => import('./components/SignUp/SignUp'));
const VerifyAccount = lazy(() => import('./components/VerifyAccount/verifyAccount'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
<<<<<<< HEAD
const NotFound = lazy(() => import('./components/NotFound/NotFound')); 
=======
const NotFound = lazy(() => import('./components/NotFound/NotFound')); // Assume you have a NotFound component
>>>>>>> 817a0e9d284b50eab56823892b5c11eded818f8a

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />
        <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
