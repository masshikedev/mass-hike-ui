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

export const getTripList = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_TRIP_LIST_ATTEMPT });
    fetchAllTrips()
      .then(getAllTripsSuccess(dispatch))
      .catch(getAllTripsFailure(dispatch));
  };
};

const adminGetAllTripsSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_GET_TRIP_LIST_SUCCESS,
      payload: {
        trips: response.data,
      },
    });
  };
};

const adminGetAllTripsFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_GET_TRIP_LIST_ERROR });
  };
};

export const adminGetAllTrips = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_GET_TRIP_LIST_ATTEMPT });
    adminFetchAllTrips()
      .then(adminGetAllTripsSuccess(dispatch))
      .catch(adminGetAllTripsFailure(dispatch));
  };
};
