import { get, put } from '../utils/api';

const BASE_URL = '/availability';

export const fetchAvailability = () => {
  return get(BASE_URL);
};

export const updateAvailability = attributes => {
  return put(BASE_URL, JSON.stringify(attributes));
};
