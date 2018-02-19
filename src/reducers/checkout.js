import ActionTypes from '../actions/ActionTypes';

const initialState = {
  name: 'Matthew Panzer',
  phone: '516 987 7843',
  email: 'panzer.ma',
  preferredContactMethod: 'email',
  tickets: '3',
  pickupLocation: 'Ryder Hall',
  promoCode: 'please',
  cardNumber: '0123456789012345',
  expiration: '3942',
  cvv: '334',
  billingZip: '11667',
  currentSection: 0,
  highestCompletedSection: 0,
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
