import ActionTypes from './ActionTypes';
import { createDonation } from '../api/donations';

const donateSuccess = dispatch => {
  return () => {
    console.log('success');
    dispatch({ type: ActionTypes.DONATE_SUCCESS });
  };
};

const donateError = dispatch => {
  return error => {
    console.log(error);
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
