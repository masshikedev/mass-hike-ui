import { formatResponse } from '../utils/api';

const BASE_URL = 'https://shielded-cove-82777.herokuapp.com/trips';

export const fetchAllTrips = () => {
  return fetch(`${BASE_URL}`, { method: 'get' }).then(formatResponse);
};
