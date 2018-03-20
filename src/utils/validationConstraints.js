const contactConstraints = () => {
  return {
    name: {
      presence: {
        allowEmpty: false,
        message: '^Please enter your name',
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^Please enter your email',
      },
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
        message: '^Formatting error, please try again',
      },
    },
    preferredContactMethods: {
      presence: { allowEmpty: false },
    },
  };
};

const hikeConstraints = trip => {
  const remaining = trip.capacity - trip.ticketsSold;
  const zips = trip.pickupZipcodes.map(z => z.zip);
  return {
    tickets: {
      presence: {
        allowEmpty: false,
        message: '^Please enter a number',
      },
      numericality: {
        greaterThan: 0,
        notGreaterThan: '^ Please enter a number greater than 0',
        lessThanOrEqualTo: remaining,
        notLessThanOrEqualTo: `^We have ${remaining} tickets remaining for this trip. Please enter a number up to ${remaining}`,
        onlyInteger: true,
        notInteger: '^Must be a whole number (1, 2, 3...)',
      },
    },
    pickupLocation: {
      presence: {
        allowEmpty: false,
        message: '^Please enter your address',
      },
      inclusion: {
        within: zips,
        message: '^Please select a zipcode.',
      },
    },
  };
};
const paymentTypeConstraints = (trip, priceData) => {
  const { pricing } = trip;
  pricing.promoCodes[''] = 'standard';
  return {
    promoCode: {
      inclusion: {
        within: pricing.promoCodes,
        message: '^Sorry, %{value} is not a valid promo code.',
      },
    },
    selectedPrice: {
      presence: {
        allowEmpty: true,
      },
      numericality: {
        greaterThan: priceData.min,
        notGreaterThan: `^ Your minimum price is $${priceData.min}`,
        lessThanOrEqualTo: priceData.max,
        notLessThanOrEqualTo: `^ Sorry, we will not accept more than $${
          priceData.max
        } per ticket.`,
      },
    },
  };
};

export { contactConstraints, hikeConstraints, paymentTypeConstraints };
