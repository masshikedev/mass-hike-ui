import ActionTypes from './ActionTypes';

export const nextCheckoutSection = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.NEXT_CHECKOUT_SECTION,
    });
  };
};

export const setCheckoutState = checkoutState => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SET_CHECKOUT_STATE,
      payload: {
        checkoutState: checkoutState,
      },
    });
  };
};
