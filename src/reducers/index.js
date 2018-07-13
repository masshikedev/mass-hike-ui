import { combineReducers } from 'redux';
import tripList from './tripList';
import currentTrip from './currentTrip';
import checkout from './checkout';
import orders from './orders';
import auth from './auth';
import members from './members';
import availability from './availability';
import donations from './donations';
import contact from './contact';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  tripList,
  currentTrip,
  checkout,
  orders,
  members,
  auth,
  availability,
  donations,
  contact,
  routing: routerReducer,
});
