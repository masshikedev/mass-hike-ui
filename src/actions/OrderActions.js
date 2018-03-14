import ActionTypes from './ActionTypes';
import { fetchOrderById, createOrder } from '../api/orders';
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
