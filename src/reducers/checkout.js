import ActionTypes from '../actions/ActionTypes';

const initialState = {
  name: 'm',
  phone: 'm',
  email: 'm',
  preferredContactMethods: ['email', 'phone'],
  tickets: '2',
  pickupLocation: '',
  promoCode: '',
  cardNumber: '0123456789012345',
  expiration: '0123',
  cvv: '012',
  billingZip: '01234',
  currentSection: 0,
  highestCompletedSection: 0,
  paymentType: 'card',
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
