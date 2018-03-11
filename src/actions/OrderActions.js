import ActionTypes from './ActionTypes';
import { fetchOrderById, createOrder } from '../api/orders';

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

const createOrderSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CREATE_ORDER_SUCCESS,
      payload: {
        order: response.data,
      },
    });
  };
};

const createOrderFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.CREATE_ORDER_ERROR });
  };
};

export const createOrder = order => {
  return dispatch => {
    dispatch({ type: ActionTypes.CREATE_ORDER_ATTEMPT });
    createOrder(order)
      .then(createOrderSuccess(dispatch))
      .catch(createOrderFailure(dispatch));
  };
};
