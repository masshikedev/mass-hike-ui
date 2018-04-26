import { get, post, put } from '../utils/api';

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

export const updateMember = (id, attributes) => {
  return put(`${BASE_URL}/${id}`, JSON.stringify(attributes));
};
