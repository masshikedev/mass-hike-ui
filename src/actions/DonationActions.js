import ActionTypes from './ActionTypes';
import { createDonation } from '../api/donations';

const donateSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.DONATE_SUCCESS,
      payload: { donation: response.data },
    });
  };
};

const donateError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.DONATE_ERROR });
  };
};

export const donate = donation => {
  return dispatch => {
    dispatch({ type: ActionTypes.DONATE_ATTEMPT });
    createDonation(donation)
      .then(donateSuccess(dispatch))
      .catch(donateError(dispatch));
  };
};

export const reset = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.RESET_DONATE });
  };
};
