import ActionTypes from './ActionTypes';
import {
  fetchTripById,
  adminFetchTripById,
  createTrip,
  updateTrip,
} from '../api/trips';
import { push } from 'react-router-redux';

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

const adminGetTripByIdSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_GET_TRIP_BY_ID_SUCCESS,
      payload: {
        trip: response.data,
      },
    });
  };
};

const adminGetTripByIdError = dispatch => {
  return error => {
    dispatch({ type: ActionTypes.ADMIN_GET_TRIP_BY_ID_ERROR });
  };
};

export const adminGetTripById = tripId => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_GET_TRIP_BY_ID_ATTEMPT });
    adminFetchTripById(tripId)
      .then(adminGetTripByIdSuccess(dispatch))
      .catch(adminGetTripByIdError(dispatch));
  };
};

const adminCreateTripSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_CREATE_TRIP_SUCCESS,
    });
    const tripId = response.data.tripId;
    dispatch(push(`/admin/trips/${tripId}/details`));
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

const adminUpdateTripSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_UPDATE_TRIP_SUCCESS,
      payload: {
        trip: response.data.value,
      },
    });
    const tripId = response.data.value.tripId;
    dispatch(push(`/admin/trips/${tripId}/details`));
  };
};

const adminUpdateTripError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_TRIP_ERROR });
  };
};

export const adminEditTrip = (tripId, attributes) => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_TRIP_ATTEMPT });
    updateTrip(tripId, attributes)
      .then(adminUpdateTripSuccess(dispatch))
      .catch(adminUpdateTripError(dispatch));
  };
};
