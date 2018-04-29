import ActionTypes from './ActionTypes';
import { fetchAvailability, updateAvailability } from '../api/availability';

const getAvailabilitySuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.GET_AVAILABILITY_SUCCESS,
      payload: {
        times: response.data.times,
        locations: response.data.locations,
      },
    });
  };
};

const getAvailabilityError = dispatch => {
  return () => {
    dispatch({
      type: ActionTypes.GET_AVAILABILITY_ERROR,
    });
  };
};

export const getAvailability = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_AVAILABILITY_ATTEMPT });
    fetchAvailability()
      .then(getAvailabilitySuccess(dispatch))
      .catch(getAvailabilityError(dispatch));
  };
};

const adminUpdateAvailabilitySuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.UPDATE_AVAILABILITY_SUCCESS,
      payload: {
        times: response.data.value.times,
        locations: response.data.value.locations,
      },
    });
  };
};

const adminUpdateAvailabilityError = dispatch => {
  return () => {
    dispatch({
      type: ActionTypes.UPDATE_AVAILABILITY_ERROR,
    });
  };
};

export const adminUpdateAvailability = attributes => {
  return dispatch => {
    dispatch({ type: ActionTypes.UPDATE_AVAILABILITY_ATTEMPT });
    updateAvailability(attributes)
      .then(adminUpdateAvailabilitySuccess(dispatch))
      .catch(adminUpdateAvailabilityError(dispatch));
  };
};
