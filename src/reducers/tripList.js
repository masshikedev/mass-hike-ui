import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  adminStatus: RequestStatus.UNITIALIZED,
  trips: [],
  adminTrips: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRIP_LIST_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.ADMIN_GET_TRIP_LIST_ATTEMPT:
      return {
        ...state,
        adminStatus: RequestStatus.PENDING,
      };
    case ActionTypes.GET_TRIP_LIST_SUCCESS:
      return {
        ...state,
        status: RequestStatus.SUCCESS,
        trips: action.payload.trips,
      };
    case ActionTypes.ADMIN_GET_TRIP_LIST_SUCCESS:
      return {
        ...state,
        adminStatus: RequestStatus.SUCCESS,
        adminTrips: action.payload.trips,
      };
    case ActionTypes.GET_TRIP_LIST_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    case ActionTypes.ADMIN_GET_TRIP_LIST_ERROR:
      return {
        ...state,
        adminStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
