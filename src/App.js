import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DeploymentHistory from './components/DeploymentHistory/DeploymentHistory';
import DeploymentOptions from './components/DeploymentOption/DeploymentOptions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/" exact>
          {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/deployment-history">
          {isAuthenticated ? <DeploymentHistory /> : <Redirect to="/login" />}
        </Route>
        <Route path="/deployment-options">
          {isAuthenticated ? <DeploymentOptions /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
