import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  currentOrderStatus: RequestStatus.UNITIALIZED,
  confirmOrderStatus: RequestStatus.UNITIALIZED,
  unpaidOrdersStatus: RequestStatus.UNITIALIZED,
  updateOrderStatus: RequestStatus.UNITIALIZED,
  currentOrder: null,
  unpaidOrders: [],
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
        currentOrder: action.payload.order,
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
    case ActionTypes.ADMIN_GET_UNPAID_ORDERS_ATTEMPT:
      console.log('there was an attempt');
      return {
        ...state,
        unpaidOrdersStatus: RequestStatus.PENDING,
      };
    case ActionTypes.ADMIN_GET_UNPAID_ORDERS_SUCCESS:
      return {
        ...state,
        unpaidOrdersStatus: RequestStatus.SUCCESS,
        unpaidOrders: action.payload.orders,
      };
    case ActionTypes.ADMIN_GET_UNPAID_ORDERS_ERROR:
      return {
        ...state,
        unpaidOrdersStatus: RequestStatus.ERROR,
      };
    case ActionTypes.ADMIN_UPDATE_ORDER_ATTEMPT:
      console.log('attempt');
      return {
        ...state,
        updateOrderStatus: RequestStatus.UNITIALIZED,
      };
    case ActionTypes.ADMIN_UPDATE_ORDER_SUCCESS:
      console.log('success');
      return {
        ...state,
        updateOrderStatus: RequestStatus.SUCCESS,
        currentOrder: {
          ...state.currentOrder,
          ...action.payload.order,
        },
      };
    case ActionTypes.ADMIN_UPDATE_ORDER_ERROR:
      return {
        ...state,
        updateOrderStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
