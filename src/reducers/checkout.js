import ActionTypes from '../actions/ActionTypes';

const initialState = {
  name: '',
  phone: '',
  email: '',
  preferredContactMethod: 'email',
  tickets: '',
  pickupLocation: '',
  promoCode: '',
  cardNumber: '',
  expiration: '',
  cvv: '',
  billingZip: '',
  currentSection: 0,
  highestCompletedSection: 0,
  paymentType: 'cash',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NEXT_CHECKOUT_SECTION:
      const nextSection = state.currentSection + 1;
      const nextHighestCompletedSection =
        nextSection > state.highestCompletedSection
          ? state.highestCompletedSection + 1
          : state.highestCompletedSection;
      return {
        ...state,
        currentSection: nextSection,
        highestCompletedSection: nextHighestCompletedSection,
      };
    case ActionTypes.SET_CHECKOUT_STATE:
      return {
        ...state,
        ...action.payload.checkoutState,
      };
    default:
      return state;
  }
};
