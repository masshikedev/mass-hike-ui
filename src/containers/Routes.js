import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import Home from './Home';
import TripList from './TripList';
import Checkout from './Checkout';
import PrismicRoute from '../prismic/PrismicRoute';

const Routes = props => (
  <Switch>
    <PrismicRoute
      exact
      path="/"
      routerProps={props}
      componentProps={{ uid: 'home' }}
      component={Home}
    />
    <PrismicRoute
      exact
      path="/trips"
      routerProps={props}
      componentProps={{ uid: 'trips' }}
      component={TripList}
    />
    <Route exact path="/trips/:id/checkout" component={Checkout} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
