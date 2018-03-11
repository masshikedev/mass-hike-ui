import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  currentOrderStatus: RequestStatus.UNITIALIZED,
  createOrderStatus: RequestStatus.UNITIALIZED,
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
    case ActionTypes.CREATE_ORDER_ATTEMPT:
      return {
        ...state,
        createOrderStatus: RequestStatus.PENDING,
      };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderStatus: RequestStatus.SUCCESS,
      };
    case ActionTypes.CREATE_ORDER_ERROR:
      return {
        ...state,
        createOrderStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
