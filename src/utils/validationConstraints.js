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
    kids: {
      presence: {
        allowEmpty: false,
        message: '^Please enter an amount',
      },
      numericality: {
        onlyInteger: true,
        notInteger: '^Must be a whole number (1, 2, 3...)',
        message: '^Please enter a number (1, 2, 3...)',
      },
    },
    kids: {
      presence: {
        allowEmpty: false,
        message: '^Please enter an amount',
      },
      numericality: {
        onlyInteger: true,
        notInteger: '^Must be a whole number (1, 2, 3...)',
        message: '^Please enter a number (1, 2, 3...)',
      },
    },
    kids: {
      presence: {
        allowEmpty: false,
        message: '^Please enter an amount',
      },
      numericality: {
        onlyInteger: true,
        notInteger: '^Must be a whole number (1, 2, 3...)',
        message: '^Please enter a number (1, 2, 3...)',
      },
    },
    pickupLocation: {
      presence: {
        allowEmpty: false,
        message: '^Please enter your address',
      },
    },
    zipCode: {
      presence: {
        allowEmpty: false,
        message:
          '^Sorry, we could not determine a zip code for this place. Try selecting a specific street address.',
      },
      inclusion: {
        within: trip.pickupZipcodes.map(zipcode => zipcode.zipcode),
        message: '^Sorry, this trip will not be serving the zipcode %{value}.',
      },
    },
  };
};
const paymentTypeConstraints = (trip, currentPricing) => {
  const { promoCodes } = trip;
  return {
    promoCode: {
      inclusion: {
        within: [''].concat(promoCodes.map(pricing => pricing.promoCode)),
        message: '^Sorry, %{value} is not a valid promo code.',
      },
    },
    selectedPrice: {
      presence: {
        allowEmpty: true,
      },
      numericality: {
        greaterThanOrEqualTo: currentPricing.min,
        notGreaterThanOrEqualTo: `^ Your minimum price is $${
          currentPricing.min
        }`,
        lessThanOrEqualTo: currentPricing.max,
        notLessThanOrEqualTo: `^ Sorry, we will not accept more than $${
          currentPricing.max
        } per ticket.`,
      },
    },
  };
};

const constraints = (trip, priceData) => {
  return {
    ...contactConstraints(),
    ...hikeConstraints(trip),
    ...paymentTypeConstraints(trip, priceData),
  };
};

const tripConstraints = trip => {
  const { time, pricing } = trip;
  return {
    name: {
      presence: {
        allowEmpty: false,
      },
    },
    location: {
      presence: {
        allowEmpty: false,
      },
    },
    'time.pickupStart': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        lessThan: time.pickupEnd,
        message: '^Hike times are not ordered correctly.',
      },
    },
    'time.pickupEnd': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        greaterThan: time.pickupStart,
        lessThan: time.hikeStart,
        message: '^Hike times are not ordered correctly.',
      },
    },
    'time.hikeStart': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        greaterThan: time.pickupEnd,
        lessThan: time.hikeEnd,
        message: '^Hike times are not ordered correctly.',
      },
    },
    'time.hikeEnd': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        greaterThan: time.hikeStart,
        lessThan: time.dropoffStart,
        message: '^Hike times are not ordered correctly.',
      },
    },
    'time.dropoffStart': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        greaterThan: time.hikeEnd,
        lessThan: time.dropoffEnd,
        message: '^Hike times are not ordered correctly.',
      },
    },
    'time.dropoffEnd': {
      presence: {
        allowEmpty: false,
        message: '^All trip time must be filled out',
      },
      numericality: {
        greaterThan: time.dropoffStart,
        message: '^Hike times are not ordered correctly.',
      },
    },
    capacity: {
      presence: true,
      numericality: true,
    },
    'pricing.min': {
      presence: true,
      numericality: {
        lessThanOrEqualTo: +pricing.max,
        notLessThanOrEqualTo: '^Base price cannot be higher than max price',
      },
    },
    'pricing.max': {
      presence: true,
    },
    'pricing.suggestion1': {
      presence: true,
      numericality: {
        greaterThanOrEqualTo: +pricing.min,
        lessThan: +pricing.suggestion2,
        message:
          '^Suggestion 1 should be between the base price and suggestion 2',
      },
    },
    'pricing.suggestion2': {
      presence: true,
      numericality: {
        greaterThan: +pricing.suggestion1,
        lessThan: +pricing.suggestion3,
        message:
          '^Suggestion 2 should be between the suggestion 1 and suggestion 3',
      },
    },
    'pricing.suggestion3': {
      presence: true,
      numericality: {
        greaterThan: +pricing.suggestion2,
        lessThanOrEqualTo: +pricing.max,
        message:
          '^Suggestion 3 should be between the suggestion 2 and the max price',
      },
    },
    difficulty: {
      presence: {
        allowEmpty: false,
      },
    },
    'stats.hikeDistance': {
      numericality: true,
    },
    'stats.elevation': {
      numericality: true,
    },
    'detail.title': {
      presence: {
        allowEmpty: false,
      },
    },
    'detail.body': {
      presence: {
        allowEmpty: false,
      },
    },
    'detail.imageUrl': {
      presence: {
        allowEmpty: false,
        message: 'Please upload an image for this trip',
      },
    },
    pickupZipcodes: {
      presence: true,
      length: {
        minimum: 1,
        message: '^You must set at least one pickup zipcode for this trip',
      },
    },
  };
};

const memberConstraints = () => {
  return {
    name: {
      presence: {
        allowEmpty: false,
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^A member must have either an email or phone number',
      },
      email: { message: '^Please enter a valid email' },
    },
    phone: {
      presence: {
        allowEmpty: false,
        message: '^A member must have either an email or phone number',
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
  };
};

export {
  contactConstraints,
  hikeConstraints,
  paymentTypeConstraints,
  constraints,
  tripConstraints,
  memberConstraints,
};
