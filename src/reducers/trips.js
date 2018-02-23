import ActionTypes from '../actions/ActionTypes';
import RequestStatus from '../RequestStatus';

const initialState = {
  status: RequestStatus.UNITIALIZED,
  tripList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TRIP_DATA_ATTEMPT:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case ActionTypes.GET_TRIP_DATA_SUCCESS:
      return {
        status: RequestStatus.SUCCESS,
        tripList: action.payload.trips,
      };
    case ActionTypes.GET_TRIP_DATA_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
