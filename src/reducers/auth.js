import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';
import hasAuthenticatedToken from '../utils/hasAuthenticatedToken';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  isAuthenticated: hasAuthenticatedToken(),
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
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
