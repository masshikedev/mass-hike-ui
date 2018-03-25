import ActionTypes from './ActionTypes';
import { postLoginCredentials } from '../api/auth';

const loginSuccess = dispatch => {
  return response => {
    localStorage.setItem('mh-login-token', response.token);
    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
    });
  };
};

const loginFailure = dispatch => {
  return error => {
    dispatch({ type: ActionTypes.LOGIN_ERROR, payload: { error } });
  };
};

export const login = credentials => {
  return dispatch => {
    dispatch({ type: ActionTypes.LOGIN_ATTEMPT });
    postLoginCredentials(credentials)
      .then(loginSuccess(dispatch))
      .catch(loginFailure(dispatch));
  };
};

export const logout = () => {
  localStorage.removeItem('mh-login-token');
  return { type: ActionTypes.LOGOUT };
};
