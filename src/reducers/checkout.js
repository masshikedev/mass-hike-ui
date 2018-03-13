import ActionTypes from '../actions/ActionTypes';

const initialState = {
  // Contact
  name: '',
  phone: '',
  email: '',
  preferredContactMethods: ['email', 'phone'],

  // Tickets
  tickets: '',
  pickupLocation: '',

  // Payment amount & type
  promoCode: '',
  price: '',
  paymentType: 'card',

  // Pay card
  cardNumber: '',
  expiration: '',
  cvv: '',
  billingZip: '',

  // Pay cash
  selectedLocation: -1,
  meetingDate: '',

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
    case ActionTypes.PREV_CHECKOUT_SECTION:
      const prevSection = state.currentSection - 1;
      return {
        ...state,
        currentSection: prevSection >= 0 ? prevSection : 0,
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
