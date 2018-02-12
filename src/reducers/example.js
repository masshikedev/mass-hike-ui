import ActionTypes from '../actions/ActionTypes';

export default (state = null, action) => {
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
