const trips = [
  {
    name: 'Blue Hills',
    time: {
      hikeStart: 1520683200000,
      hikeEnd: 1520701200000,
      pickupStart: 1520679600000,
      pickupEnd: 1520681400000,
      dropoffStart: 1520703000000,
      dropoffEnd: 1520704800000,
    },
    capacity: 15,
    ticketsSold: 5,
    difficulty: 'easy',
    detail: {
      title: 'Wow Blue Hills is Cool!',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas, nulla id molestie eleifend, nisi quam aliquam tellus, non euismod mi sapien et erat. Aliquam vestibulum, mi a vulputate egestas, orci nisl dignissim lacus, non semper felis urna bibendum urna. Quisque dapibus suscipit leo id fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat ut lorem sed pellenque. Aliquam quis quam semper, mattis lorem vitae, consequat leo. Ut a tortor orci. Etiam tellus est, vehicula eu rhoncus vitae, pellentesque eget arcu. Nunc sit amet leo neque. Proin lacus lorem, gravida ac bibendum in, lobortis vel arcu. ',
    },
    location: 'Milton, MA',
    distanceAway: 20,
    price: 15,
    stats: {
      hikeDistance: 2.1,
      elevation: 100,
    },
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
    id: 0,
  },
  {
    name: 'Wachusett Mountain',
    time: {
      hikeStart: 1523530800000,
      hikeEnd: 1523552400000,
      pickupStart: 1523525400000,
      pickupEnd: 1523527200000,
      dropoffStart: 1523556000000,
      dropoffEnd: 1523557800000,
    },
    capacity: 15,
    ticketsSold: 2,
    difficulty: 'moderate',
    detail: {
      title: 'Wachusett is a very cool mountain',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas, nulla id molestie eleifend, nisi quam aliquam tellus, non euismod mi sapien et erat. Aliquam vestibulum, mi a vulputate egestas, orci nisl dignissim lacus, non semper felis urna bibendum urna. Quisque dapibus suscipit leo id fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat ut lorem sed pellenque. Aliquam quis quam semper, mattis lorem vitae, consequat leo. Ut a tortor orci. Etiam tellus est, vehicula eu rhoncus vitae, pellentesque eget arcu. Nunc sit amet leo neque. Proin lacus lorem, gravida ac bibendum in, lobortis vel arcu. ',
    },
    location: 'Princeton, MA',
    distanceAway: 80,
    price: 15,
    stats: {
      hikeDistance: 3.1,
      elevation: 600,
    },
    id: 1,
  },
];

export default trips;
