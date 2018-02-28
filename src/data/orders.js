const orders = {
  dummy1: {
    name: 'Matthew Panzer',
    phone: '(516) 987-7974',
    email: 'panzer.ma@husky.neu.edu',
    preferredContactMethods: ['email', 'phone'],
    tickets: '2',
    pickupLocation: 'Ryder Hall',
    promoCode: '',
    cardNumber: '0123456789012345',
    expiration: '0123',
    cvv: '012',
    billingZip: '01234',
    paymentType: 'card',
    tripId: 0,
    trip: {
      name: 'Blue Hills',
      time: { hikeStart: 1520683200000 },
      price: 15,
      cashLocations: [
        {
          name: 'Blackstone',
          location: 'South End, Boston',
          link: 'http://maps.google.com',
        },
        {
          name: 'Shelburne',
          location: 'Roxbury, Boston',
          link: 'http://maps.google.com',
        },
        {
          name: 'Hennigan',
          location: 'Jamaica Plain, Boston',
          link: 'http://maps.google.com',
        },
        {
          name: 'Charlestown',
          location: 'Charlestown, Boston',
          link: 'http://maps.google.com',
        },
        {
          name: 'Hyde Park',
          location: 'Hyde Park, Boston',
          link: 'http://maps.google.com',
        },
      ],
    },
  },
};

export default orders;
