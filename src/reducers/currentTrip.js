import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  trip: null,
  adminCreateStatus: RequestStatus.UNITIALIZED,
  adminTrip: null,
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
    case ActionTypes.ADMIN_CREATE_TRIP_ATTEMPT:
      return {
        ...state,
        adminCreateStatus: RequestStatus.PENDING,
      };
    case ActionTypes.ADMIN_CREATE_TRIP_SUCCESS:
      return {
        ...state,
        adminCreateStatus: RequestStatus.SUCCESS,
      };
    case ActionTypes.ADMIN_CREATE_TRIP_ERROR:
      return {
        ...state,
        adminCreateStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
