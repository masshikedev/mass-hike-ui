import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEND_MESSAGE_ATTEMPT:
      return {
        status: RequestStatus.PENDING,
      };
    case ActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        status: RequestStatus.SUCCESS,
      };
    case ActionTypes.SEND_MESSAGE_ERROR:
      return {
        status: RequestStatus.ERROR,
      };
    case ActionTypes.RESET_CONTACT:
      return {
        status: RequestStatus.UNITIALIZED,
      };
    default:
      return state;
  }
};
