import { combineReducers } from 'redux';
import tripList from './tripList';
import currentTrip from './currentTrip';
import checkout from './checkout';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  tripList,
  currentTrip,
  checkout,
  routing: routerReducer,
});
