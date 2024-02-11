import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Login = lazy(() => import('./components/Login/Login'));
const SignUp = lazy(() => import('./components/SignUp/SignUp'));
const VerifyAccount = lazy(() => import('./components/VerifyAccount/verifyAccount'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const DeploymentForm = lazy(() => import('./components/DeploymentOption/DeploymentOption'));
const DeploymentHistory = lazy(() => import('./components/DeploymentHistory/DeploymentHistory'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deploy" element={<DeploymentForm />} />
          <Route path="/history" element={<DeploymentHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
