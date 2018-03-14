import { get } from '../utils/api';

const BASE_URL = '/trips';

export const fetchAllTrips = () => {
  return get(BASE_URL);
};

export const fetchTripById = tripId => {
  return get(`${BASE_URL}/${tripId}`);
};
