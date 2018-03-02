const contactConstraints = () => {
  return {
    name: {
      presence: { allowEmpty: false, message: '^Please enter your name' },
    },
    email: {
      presence: { allowEmpty: false, message: '^Please enter your email' },
      email: { message: '^Please enter a valid email' },
    },
    phone: {
      presence: {
        allowEmpty: false,
        message: '^Please enter your phone number',
      },
      length: {
        is: 16,
        message: '^Phone number is not long enough',
      },
      format: {
        pattern: /[(]\d{3}[)] \d{3} [-] \d{4}/,
        message: '^Formatting error',
      },
    },
    preferredContactMethods: {
      presence: { allowEmpty: false },
    },
  };
};

const hikeConstraints = trip => {
  const remaining = trip.capacity - trip.ticketsSold;
  return {
    tickets: {
      presence: true,
      numericality: {
        greaterThan: 0,
        lessThanOrEqualTo: remaining,
      },
    },
    location: {
      presence: true,
    },
  };
};
const constraints = {};

export { contactConstraints, hikeConstraints };
