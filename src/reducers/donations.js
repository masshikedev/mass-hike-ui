import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DONATE_ATTEMPT:
      return {
        status: RequestStatus.PENDING,
      };
    case ActionTypes.DONATE_SUCCESS:
      return {
        status: RequestStatus.SUCCESS,
      };
    case ActionTypes.DONATE_ERROR:
      return {
        status: RequestStatus.ERROR,
      };
    case ActionTypes.RESET_DONATE:
      return {
        status: RequestStatus.UNITIALIZED,
      };
    default:
      return state;
  }
};
