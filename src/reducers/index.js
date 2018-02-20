import { combineReducers } from 'redux';
import trips from './trips';
import checkout from './checkout';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  trips,
  checkout,
  routing: routerReducer,
});
