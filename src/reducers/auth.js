import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  isAuthenticated: localStorage.getItem('mh-login-token') ? true : false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_ATTEMT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        status: RequestStatus.SUCCESS,
        isAuthenticated: true,
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
        error: action.payload.error,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
