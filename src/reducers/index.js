import { combineReducers } from 'redux';
import tripList from './tripList';
import currentTrip from './currentTrip';
import checkout from './checkout';
import orders from './orders';
import auth from './auth';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  tripList,
  currentTrip,
  checkout,
  orders,
  auth,
  routing: routerReducer,
});
