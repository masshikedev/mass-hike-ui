import ActionTypes from '../actions/ActionTypes';

const initialState = {
  // Contact
  name: 'Test Person',
  phone: '1234567890',
  email: 'test@test.com',
  preferredContactMethods: ['email'],

  // Tickets
  tickets: '2',
  pickupLocation: '02115',

  // Payment amount & type
  promoCode: '',
  price: '',
  paymentType: 'card',

  // Pay card
  cardNumber: '1111222233334444',
  expiration: '1/20',
  cvv: '123',
  billingZip: '12345',

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
    case ActionTypes.SET_CHECKOUT_STATE:
      return {
        ...state,
        ...action.payload.checkoutState,
      };
    default:
      return state;
  }
};
