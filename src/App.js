import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load components
const Login = lazy(() => import("./components/Login/Login"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));
const VerifyAccount = lazy(() =>
  import("./components/VerifyAccount/verifyAccount")
);
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const DeploymentForm = lazy(() =>
  import("./components/DeploymentOption/DeploymentOption")
);
const DeploymentHistory = lazy(() =>
  import("./components/DeploymentHistory/DeploymentHistory")
);
const Settings = lazy(() => import("./components/Settings/Settings"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Layout = lazy(() => import("./components/Sidebar/LayoutWithSidebar")); // Make sure this path is correct
const LightSail = lazy(() =>
  import("./components/DeploymentOption/LightSail/LightSail")
);
const Monolith = lazy(() =>
  import("./components/DeploymentOption/Monolith/Monolith")
);
const HighAvailiblity = lazy(() =>
  import("./components/DeploymentOption/HighAvailiblity/HighAvailiblity")
);
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="*" element={<NotFound />} />

          {/* Layout route */}
          <Route path="/" element={<Layout />}>
            {/* Nested routes within Layout */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="deployment-options" element={<DeploymentForm />} />
            <Route path="history" element={<DeploymentHistory />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="lightsail" element={<LightSail />} />
            <Route path="monolith" element={<Monolith />} />
            <Route path="high-available" element={<HighAvailiblity />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
