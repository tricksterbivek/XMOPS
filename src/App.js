import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports'; // Adjust the path as necessary

// Lazy load components
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const DeploymentForm = lazy(() => import("./components/DeploymentOption/DeploymentOption"));
const DeploymentHistory = lazy(() => import("./components/DeploymentHistory/DeploymentHistory"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Layout = lazy(() => import("./components/Sidebar/LayoutWithSidebar"));
const LightSail = lazy(() => import("./components/DeploymentOption/LightSail/LightSail"));
const Monolith = lazy(() => import("./components/DeploymentOption/Monolith/Monolith"));
const HighAvailiblity = lazy(() => import("./components/DeploymentOption/HighAvailiblity/HighAvailiblity"));
const SignIn = lazy(() => import("./components/Login/Login"));
Amplify.configure(awsconfig);

function App({ signOut, user }) {
  return (
    
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout signOut={signOut} user={user} />}>
            {/* Nested routes within Layout */}
            <Route index element={<Dashboard />} />
            <Route path = "dashboard" element={<Dashboard />} />
            <Route path="deployment-options" element={<DeploymentForm />} />
            <Route path="history" element={<DeploymentHistory />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="lightsail" element={<LightSail />} />
            <Route path="monolith" element={<Monolith />} />
            <Route path="high-available" element={<HighAvailiblity />} />
            <Route path="*" element={<NotFound />} />
            <Route path="signIn" element={<SignIn />} />
          </Route>
        </Routes>
        <Button variation="primary" onClick={signOut}>Sign out</Button>
      </Suspense>
    </Router>
  );
}

export default withAuthenticator(App);