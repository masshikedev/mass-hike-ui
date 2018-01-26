import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import './App.css';
import Home from './Home';
import PrismicRoute from './prismic/PrismicRoute';

const App = props => (
  <Router>
    <Switch>
      <PrismicRoute
        path="/"
        routerProps={props}
        componentProps={{ uid: 'home' }}
        component={Home}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
