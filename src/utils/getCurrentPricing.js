export default (promoCode, trip) => {
  const promoCodes = trip.promoCodes;
  for (let i = 0; i < promoCodes.length; i++) {
    if (promoCode === promoCodes[i].promoCode) {
      return promoCodes[i];
    }
  }
  return trip.pricing;
};
