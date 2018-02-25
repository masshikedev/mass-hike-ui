import ActionTypes from '../actions/ActionTypes';
import RequestStatus from '../RequestStatus';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  trip: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRIP_BY_ID_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.GET_TRIP_BY_ID_SUCCESS:
      return {
        ...state,
        status: RequestStatus.SUCCESS,
        trip: action.payload.trip,
      };
    case ActionTypes.GET_TRIP_BY_ID_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
