import ActionTypes from './ActionTypes';
import {
  fetchOrderById,
  createOrder,
  getUnpaid,
  updateOrder,
} from '../api/orders';
import { push } from 'react-router-redux';

const getOrderByIdSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.GET_ORDER_BY_ID_SUCCESS,
      payload: {
        order: response.data,
      },
    });
  };
};

const getOrderByIdFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.GET_ORDER_BY_ID_ERROR });
  };
};

export const getOrderById = orderId => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_ORDER_BY_ID_ATTEMPT });
    fetchOrderById(orderId)
      .then(getOrderByIdSuccess(dispatch))
      .catch(getOrderByIdFailure(dispatch));
  };
};

const confirmOrderSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CONFIRM_ORDER_SUCCESS,
      payload: {
        order: response.data,
      },
    });
    const id = response.data._id;
    dispatch(push(`/order/${id}`));
    dispatch({
      type: ActionTypes.RESET_CHECKOUT,
      payload: { nextTripId: null },
    });
  };
};

const confirmOrderFailure = dispatch => {
  return response => {
    dispatch({ type: ActionTypes.CONFIRM_ORDER_ERROR });
  };
};

export const confirmOrder = order => {
  return dispatch => {
    dispatch({ type: ActionTypes.CONFIRM_ORDER_ATTEMPT });
    createOrder(order)
      .then(confirmOrderSuccess(dispatch))
      .catch(confirmOrderFailure(dispatch));
  };
};

const adminGetUnpaidOrdersSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_GET_UNPAID_ORDERS_SUCCESS,
      payload: {
        orders: response.data,
      },
    });
  };
};

const adminGetUnpaidOrdersFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_GET_UNPAID_ORDERS_ERROR });
  };
};

export const adminGetUnpaidOrders = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_GET_UNPAID_ORDERS_ATTEMPT });
    getUnpaid()
      .then(adminGetUnpaidOrdersSuccess(dispatch))
      .catch(adminGetUnpaidOrdersFailure(dispatch));
  };
};

const adminUpdateOrderSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_UPDATE_ORDER_SUCCESS,
      payload: {
        order: response.data,
      },
    });
  };
};

const adminUpdateOrderError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_ORDER_ERROR });
  };
};

export const adminEditOrder = (id, attributes) => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_ORDER_ATTEMPT });
    updateOrder(id, attributes)
      .then(adminUpdateOrderSuccess(dispatch))
      .catch(adminUpdateOrderError(dispatch));
  };
};
