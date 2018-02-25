import ActionTypes from './ActionTypes';
import tripData from '../data/trips';
import { fetchTripById } from '../api/trips';

const getTripByIdSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.GET_TRIP_BY_ID_SUCCESS,
      payload: {
        trip: response.data,
      },
    });
  };
};

const getTripByIdFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.GET_TRIP_BY_ID_ERROR });
  };
};

export const getTripById = tripId => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_BY_ID_ATTEMPT });
    fetchTripById(tripId)
      .then(getTripByIdSuccess(dispatch))
      .catch(getTripByIdFailure(dispatch));
  };
};
