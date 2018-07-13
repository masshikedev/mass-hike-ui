import { post } from '../utils/api';

const BASE_URL = '/contact';

export const sendMessage = message => {
  return post(BASE_URL, JSON.stringify(message));
};
