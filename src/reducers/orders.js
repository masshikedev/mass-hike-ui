import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  currentOrderStatus: RequestStatus.UNITIALIZED,
  confirmOrderStatus: RequestStatus.UNITIALIZED,
  currentOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ORDER_BY_ID_ATTEMPT:
      return {
        ...state,
        currentOrderStatus: RequestStatus.PENDING,
      };
    case ActionTypes.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        currentOrderStatus: RequestStatus.SUCCESS,
        currentOrder: action.payload.trip,
      };
    case ActionTypes.GET_ORDER_BY_ID_ERROR:
      return {
        ...state,
        currentOrderStatus: RequestStatus.ERROR,
      };
    case ActionTypes.CONFIRM_ORDER_ATTEMPT:
      return {
        ...state,
        confirmOrderStatus: RequestStatus.PENDING,
      };
    case ActionTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        confirmOrderStatus: RequestStatus.SUCCESS,
      };
    case ActionTypes.CONFIRM_ORDER_ERROR:
      return {
        ...state,
        confirmOrderStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
