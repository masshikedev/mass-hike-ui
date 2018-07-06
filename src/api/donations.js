import { post } from '../utils/api';

const BASE_URL = '/donations';

export const createDonation = donation => {
  return post(BASE_URL, JSON.stringify(donation));
};
