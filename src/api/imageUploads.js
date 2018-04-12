import { postFile } from '../utils/api';

const BASE_URL = '/images';

export const uploadImage = imageFormData => {
  return postFile(BASE_URL, imageFormData);
};
