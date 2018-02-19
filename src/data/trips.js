const trips = [
  {
    name: 'Blue Hills',
    time: {
      hikeStart: 1520683200,
      hikeEnd: 1520701200,
      pickupStart: 1520679600,
      pickupEnd: 1520681400,
      dropoffStart: 1520703000,
      dropoffEnd: 1520704800,
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
    id: 0,
  },
  {
    name: 'Wachusett Mountain',
    time: {
      hikeStart: 1523530800,
      hikeEnd: 1523552400,
      pickupStart: 1523525400,
      pickupEnd: 1523527200,
      dropoffStart: 1523556000,
      dropoffEnd: 1523557800,
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
