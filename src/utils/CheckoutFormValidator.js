export default {
  name: name => name.length > 0,
  phone: phone => phone.length > 0,
  email: email => email.length > 0,
  preferredContactMethods: preferredContactMethods =>
    preferredContactMethods.length > 0,
  paymentType: paymentType => true,
  tickets: tickets => tickets !== '',
  pickupLocation: pickupLocation => pickupLocation.length === 5,
  promoCode: promoCode => true,
  cardNumber: cardNumber => cardNumber.length === 16,
  expiration: expiration => expiration.length > 0,
  cvv: cvv => cvv.length === 3,
  billingZip: billingZip => billingZip.length === 5,
};
