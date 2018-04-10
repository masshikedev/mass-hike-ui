const buildPromoCodes = promoCodes => {
  return promoCodes.map(pricing => {
    return {
      min: +pricing.min,
      max: +pricing.max,
      suggestion1: +pricing.suggestion1,
      suggestion2: +pricing.suggestion2,
      suggestion3: +pricing.suggestion3,
      promoCode: pricing.promoCode,
    };
  });
};

const buildTrip = attributes => {
  return {
    name: attributes.name,
    time: attributes.time,
    capacity: +attributes.capacity,
    difficulty: attributes.difficulty,
    detail: attributes.detail,
    location: attributes.location,
    pricing: {
      min: +attributes.pricing.min,
      max: +attributes.pricing.max,
      suggestion1: +attributes.pricing.min,
      suggestion2: +attributes.pricing.min,
      suggestion3: +attributes.pricing.min,
    },
    promoCodes: buildPromoCodes(attributes.promoCodes),
    stats: {
      hikeDistance: +attributes.stats.hikeDistance,
      elevation: +attributes.stats.elevation,
    },
    cashLocations: attributes.cashLocations,
    cashAvailability: attributes.cashAvailability,
    pickupZipcodes: attributes.pickupZipcodes,
  };
};

export default buildTrip;
