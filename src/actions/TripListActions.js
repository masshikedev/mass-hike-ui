import ActionTypes from './ActionTypes';
import { fetchAllTrips } from '../api/trips';

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

export const getTripList = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_LIST_ATTEMPT });
    fetchAllTrips()
      .then(getAllTripsSuccess(dispatch))
      .catch(getAllTripsFailure(dispatch));
  };
};
