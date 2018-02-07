import ActionTypes from '../actions/ActionTypes';

const initialState = {
  ticketsLeft: 15,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DECREMENT_TRIP_SPACES:
      const newTicketsLeft = state.ticketsLeft > 0 ? state.ticketsLeft - 1 : 0;
      return {
        ...state,
        ticketsLeft: newTicketsLeft,
      };
    default:
      return state;
  }
};
