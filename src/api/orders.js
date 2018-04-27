import { get, post, put } from '../utils/api';

const BASE_URL = '/orders';

export const createOrder = order => {
  return post(BASE_URL, JSON.stringify(order));
};

export const fetchOrderById = id => {
  return get(`${BASE_URL}/${id}`);
};

export const getUnpaid = () => {
  return get(`/admin${BASE_URL}`);
};

export const updateOrder = (id, attributes) => {
  return put(`${BASE_URL}/${id}`, JSON.stringify(attributes));
};
