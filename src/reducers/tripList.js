import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  trips: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRIP_LIST_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.GET_TRIP_LIST_SUCCESS:
      return {
        ...state,
        status: RequestStatus.SUCCESS,
        trips: action.payload.trips,
      };
    case ActionTypes.GET_TRIP_LIST_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
