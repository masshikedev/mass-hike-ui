import ActionTypes from './ActionTypes';

export const nextCheckoutSection = () => {
  return {
    type: ActionTypes.NEXT_CHECKOUT_SECTION,
  };
};

export const prevCheckoutSection = () => {
  return {
    type: ActionTypes.PREV_CHECKOUT_SECTION,
  };
};

export const setCheckoutState = checkoutState => {
  return {
    type: ActionTypes.SET_CHECKOUT_STATE,
    payload: {
      checkoutState,
    },
  };
};

export const setCurrentSection = sectionIndex => {
  return {
    type: ActionTypes.SET_CURRENT_SECTION,
    payload: { sectionIndex },
  };
};

export const resetCheckout = nextTripId => {
  return {
    type: ActionTypes.RESET_CHECKOUT,
    payload: { nextTripId },
  };
};
