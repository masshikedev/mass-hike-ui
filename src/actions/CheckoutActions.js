import ActionTypes from './ActionTypes';

export const nextCheckoutSection = () => {
  return {
    type: ActionTypes.NEXT_CHECKOUT_SECTION,
  };
};

export const setCheckoutState = checkoutState => {
  return {
    type: ActionTypes.SET_CHECKOUT_STATE,
    payload: {
      checkoutState: checkoutState,
    },
  };
};
