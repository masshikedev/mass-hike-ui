import { get, post } from '../utils/api';

const BASE_URL = '/members';

export const fetchMemberById = id => {
  return get(`${BASE_URL}/${id}`);
};

export const fetchAllMembers = () => {
  return get(BASE_URL);
};

export const createMember = member => {
  return post(BASE_URL, JSON.stringify(member));
};
