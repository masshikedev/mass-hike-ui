import ActionTypes from './ActionTypes';
import { sendMessage } from '../api/contact';

const submitMessageSuccess = dispatch => {
  return response => {
    dispatch({ type: ActionTypes.SEND_MESSAGE_SUCCESS });
  };
};

const submitMessageError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.SEND_MESSAGE_ERROR });
  };
};

export const submitMessage = message => {
  return dispatch => {
    dispatch({ type: ActionTypes.SEND_MESSAGE_ATTEMPT });
    sendMessage(message)
      .then(submitMessageSuccess(dispatch))
      .catch(submitMessageError(dispatch));
  };
};

export const reset = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.RESET_CONTACT });
  };
};
