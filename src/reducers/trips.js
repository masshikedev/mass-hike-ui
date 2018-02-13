import ActionTypes from '../actions/ActionTypes';

const initialState = {
  tripList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRIP_DATA:
      return {
        ...state,
        tripList: action.payload.tripData,
      };
    default:
      return state;
  }
};
