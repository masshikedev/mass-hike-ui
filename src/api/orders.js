import { formatResponse } from '../utils/api';

const BASE_URL = 'https://shielded-cove-82777.herokuapp.com/orders';

export const createOrder = order => {
  return fetch(BASE_URL, {
    body: JSON.stringify(order),
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  }).then(formatResponse);
};

export const fetchOrderById = id => {
  return fetch(`${BASE_URL}/${id}`, { method: 'get' }).then(formatResponse);
};
