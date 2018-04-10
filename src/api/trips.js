import { get, post } from '../utils/api';

const BASE_URL = '/trips';
const ADMIN_URL = '/admin/trips';

export const fetchAllTrips = () => {
  return get(BASE_URL);
};

export const fetchTripById = tripId => {
  return get(`${BASE_URL}/${tripId}`);
};

export const adminFetchAllTrips = () => {
  return get(ADMIN_URL);
};

export const adminFetchTripById = tripId => {
  return get(`${ADMIN_URL}/${tripId}`);
};

export const createTrip = trip => {
  return post(ADMIN_URL, JSON.stringify(trip));
};
