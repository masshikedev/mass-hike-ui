import { get, post } from '../utils/api';

const BASE_URL = '/orders';

export const createOrder = order => {
  return post(BASE_URL, JSON.stringify(order));
};

export const fetchOrderById = id => {
  return get(`${BASE_URL}/${id}`);
};
