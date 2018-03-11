import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import Home from './Home';
import TripList from './TripList';
import TripDetail from './TripDetail';
import Checkout from './Checkout';
import MobileCheckout from './MobileCheckout';
import OrderConfirmation from './OrderConfirmation';
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
    <PrismicRoute
      exact
      path="/trips/:tripId"
      routerProps={props}
      componentProps={{ uid: 'tripsdetail' }}
      component={TripDetail}
    />
    <Route exact path="/trips/:tripId/checkout" component={Checkout} />
    <Route exact path="/trips/:tripId/checkout/m" component={MobileCheckout} />
    <Route exact path="/order/:id" component={OrderConfirmation} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
