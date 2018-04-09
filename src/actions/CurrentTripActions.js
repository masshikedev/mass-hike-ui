import ActionTypes from './ActionTypes';
import { fetchTripById, createTrip } from '../api/trips';

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

const getTripByIdError = dispatch => {
  return error => {
    console.log(error);
    dispatch({ type: ActionTypes.GET_TRIP_BY_ID_ERROR });
  };
};

export const getTripById = tripId => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_BY_ID_ATTEMPT });
    fetchTripById(tripId)
      .then(getTripByIdSuccess(dispatch))
      .catch(getTripByIdError(dispatch));
  };
};

const adminCreateTripSuccess = dispatch => {
  return () => {
    dispatch({
      type: ActionTypes.ADMIN_CREATE_TRIP_SUCCESS,
    });
  };
};

const adminCreateTripError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_CREATE_TRIP_ERROR });
  };
};

export const adminCreateTrip = trip => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_CREATE_TRIP_ATTEMPT });
    createTrip(trip)
      .then(adminCreateTripSuccess(dispatch))
      .catch(adminCreateTripError(dispatch));
  };
};
