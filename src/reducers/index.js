import { combineReducers } from 'redux';
import trips from './trips';
import checkout from './checkout';

export default combineReducers({
  trips,
  checkout,
});
