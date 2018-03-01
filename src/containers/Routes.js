import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import Home from './Home';
import About from './About';
import Impact from './Impact';
import TripList from './TripList';
import TripDetail from './TripDetail';
import Checkout from './Checkout';
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
      path="/about"
      routerProps={props}
      componentProps={{ uid: 'about' }}
      component={About}
    />
    <PrismicRoute
      exact
      path="/impact"
      routerProps={props}
      componentProps={{ uid: 'impact' }}
      component={Impact}
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
      path="/trips/:id"
      routerProps={props}
      componentProps={{ uid: 'tripsdetail' }}
      component={TripDetail}
    />
    <Route exact path="/trips/:id/checkout" component={Checkout} />
    <Route exact path="/order/:id" component={OrderConfirmation} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
