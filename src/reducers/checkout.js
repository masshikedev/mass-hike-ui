import ActionTypes from '../actions/ActionTypes';

const initialState = {
  tripId: null,

  // Contact
  name: '',
  phone: '',
  email: '',
  preferredContactMethods: [],

  // Tickets
  tickets: '',
  pickupLocation: '',

  // Payment amount & type
  promoCode: '',
  selectedPrice: '',
  paymentType: 'card',

  // Pay card
  cardNumber: '',
  expiration: '',
  cvv: '',
  billingZip: '',

  // Pay cash
  selectedLocationIndex: -1,
  meetingDate: '',

  currentSection: 0,
  highestCompletedSection: 0,
  initialized: false,
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
    case ActionTypes.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload.sectionIndex,
        highestCompletedSection: Math.max(
          action.payload.sectionIndex,
          state.highestCompletedSection
        ),
      };
    case ActionTypes.RESET_CHECKOUT:
      console.log('reset checkout');
      return {
        ...initialState,
        tripId: action.payload.nextTripId,
      };
    default:
      return state;
  }
};
