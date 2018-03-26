import jwt_decode from 'jwt-decode';

export default () => {
  const token = localStorage.getItem('mh-login-token');
  if (!token) {
    return false;
  }
  const decoded = jwt_decode(token);
  return decoded.exp > Date.now() / 1000;
};
