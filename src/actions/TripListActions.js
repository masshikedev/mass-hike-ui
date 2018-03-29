import ActionTypes from './ActionTypes';
import { fetchAllTrips, adminFetchAllTrips } from '../api/trips';

const getAllTripsSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.GET_TRIP_LIST_SUCCESS,
      payload: {
        trips: response.data,
      },
    });
  };
};

const getAllTripsFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.GET_TRIP_LIST_ERROR });
  };
};

export const getTripList = admin => {
  const apiCall = admin ? adminFetchAllTrips : fetchAllTrips;
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_LIST_ATTEMPT });
    apiCall()
      .then(getAllTripsSuccess(dispatch))
      .catch(getAllTripsFailure(dispatch));
  };
};
