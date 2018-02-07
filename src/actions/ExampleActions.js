import ActionTypes from './ActionTypes';

export const decrementTripSpaces = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.DECREMENT_TRIP_SPACES,
    });
  };
};
