import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  times: [],
  locations: [],
  status: RequestStatus.UNITIALIZED,
  updateStatus: RequestStatus.UNITIALIZED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_AVAILABILITY_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.GET_AVAILABILITY_SUCCESS:
      return {
        ...state,
        times: action.payload.times,
        locations: action.payload.locations,
        status: RequestStatus.SUCCESS,
      };
    case ActionTypes.GET_AVAILABILITY_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    case ActionTypes.UPDATE_AVAILABILITY_ATTEMPT:
      return {
        ...state,
        updateStatus: RequestStatus.PENDING,
      };
    case ActionTypes.UPDATE_AVAILABILITY_SUCCESS:
      return {
        ...state,
        updateStatus: RequestStatus.SUCCESS,
        times: action.payload.times,
        locations: action.payload.locations,
      };
    case ActionTypes.UPDATE_AVAILABILITY_ERROR:
      return {
        ...state,
        updateStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
