import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import Home from './Home';
import About from './About';
import FAQ from './FAQ';
import Impact from './Impact';
import Donate from './Donate';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Contact from './Contact';
import TripList from './TripList';
import TripDetail from './TripDetail';
import Checkout from './Checkout';
import MobileCheckout from './MobileCheckout';
import OrderConfirmation from './OrderConfirmation';
import AdminDashboard from './AdminDashboard';
import AdminTripList from './AdminTripList';
import AdminTripDetail from './AdminTripDetail';
import NewTrip from './NewTrip';
import MemberList from './MemberList';
import MemberDetail from './MemberDetail';
import NewMember from './NewMember';
import EditMember from './EditMember';
import OrderDetail from './OrderDetail';
import EditAvailability from './EditAvailability';
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
      path="/contact"
      routerProps={props}
      componentProps={{ uid: 'contact' }}
      component={Contact}
    />
    <PrismicRoute
      exact
      path="/donate"
      routerProps={props}
      componentProps={{ uid: 'donate' }}
      component={Donate}
    />
    <PrismicRoute
      exact
      path="/blog"
      routerProps={props}
      componentProps={{ uid: 'blog' }}
      component={Blog}
    />
    <PrismicRoute
      exact
      path="/faq"
      routerProps={props}
      componentProps={{ uid: 'faq' }}
      component={FAQ}
    />
    <PrismicRoute
      exact
      path="/blog/:uid"
      routerProps={props}
      component={BlogPost}
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
    <Route path="/trips/:tripId/checkout" component={Checkout} />
    <Route
      exact
      path="/trips/:tripId/checkout-mobile"
      component={MobileCheckout}
    />
    <Route path="/trips/:tripId/checkout-mobile" component={MobileCheckout} />
    <Route exact path="/order/:id" component={OrderConfirmation} />
    <Route exact path="/admin" component={AdminDashboard} />
    <Route exact path="/admin/trips" component={AdminTripList} />
    <Route exact path="/admin/trips/new" component={NewTrip} />
    <Route path="/admin/trips/:tripId" component={AdminTripDetail} />
    <Route exact path="/admin/members" component={MemberList} />
    <Route exact path="/admin/members/new" component={NewMember} />
    <Route exact path="/admin/members/:id" component={MemberDetail} />
    <Route exact path="/admin/members/:id/edit" component={EditMember} />
    <Route exact path="/admin/orders/:id" component={OrderDetail} />
    <Route exact path="/admin/availability" component={EditAvailability} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
