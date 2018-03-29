import ActionTypes from './ActionTypes';
import { fetchTripById, adminFetchTripById } from '../api/trips';

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

export const getTripById = (tripId, admin) => {
  const apiCall = admin ? adminFetchTripById : fetchTripById;
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_BY_ID_ATTEMPT });
    apiCall(tripId)
      .then(getTripByIdSuccess(dispatch))
      .catch(getTripByIdFailure(dispatch));
  };
};
