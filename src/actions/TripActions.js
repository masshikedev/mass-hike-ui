import ActionTypes from './ActionTypes';
import tripData from '../data/trips';

export const getTripData = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.GET_TRIP_DATA,
      payload: {
        tripData,
      },
    });
  };
};
