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
const paymentTypeConstraints = trip => {
  // TODO: pricing should be part of the trip object
  const pricing = {
    promoCodes: { please: 'reduced', hike: 'standard', subway: 'half' },
    reduced: { min: 2, max: 30, options: [2, 5, 8] },
    half: { min: 7.5, max: 30, options: [7.5, 10, 15] },
    standard: { min: 15, max: 30, options: [15, 20, 30] },
  };
  return {
    promoCode: {
      inclusion: {
        within: pricing.promoCodes,
        message: '^Sorry, %{value} is not a valid promo code.',
      },
    },
  };
  //promoCode.length > 0 ? [2, 5, 10] : [15, 20, 30];
};

export { contactConstraints, hikeConstraints };
