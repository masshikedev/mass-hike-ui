import ActionTypes from '../actions/ActionTypes';

const initialState = {
  // Contact
  name: 'Matt',
  phone: '987',
  email: 'panzer',
  preferredContactMethods: ['email', 'phone'],

  // Tickets
  tickets: '',
  pickupLocation: '11111',

  // Payment amount & type
  promoCode: '',
  price: '',
  paymentType: 'card',

  // Pay card
  cardNumber: '0123456789012345',
  expiration: '0123',
  cvv: '012',
  billingZip: '12345',

  // Pay cash
  selectedLocation: -1,
  showMoreLocations: false,
  meetingDate: undefined,

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
