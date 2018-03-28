import { post } from '../utils/api';

export const postLoginCredentials = credentials => {
  return post('/login', JSON.stringify(credentials));
};
