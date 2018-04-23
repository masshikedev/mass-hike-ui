import ActionTypes from '../actions/ActionTypes';
import { RequestStatus } from '../constants';

const initialState = {
  members: [],
  currentMember: null,
  membersStatus: RequestStatus.UNITIALIZED,
  currentMemberStatus: RequestStatus.UNITIALIZED,
  createMemberStatus: RequestStatus.UNITIALIZED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADMIN_GET_MEMBER_BY_ID_ATTEMPT:
      return {
        ...state,
        currentMemberStatus: RequestStatus.PENDING,
      };
    case ActionTypes.ADMIN_GET_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        currentMemberStatus: RequestStatus.SUCCESS,
        currentMember: action.payload.member,
      };
    case ActionTypes.ADMIN_GET_MEMBER_BY_ID_ERROR:
      return {
        ...state,
        currentMemberStatus: RequestStatus.ERROR,
      };
    case ActionTypes.ADMIN_GET_MEMBER_LIST_ATTEMPT:
      return {
        ...state,
        membersStatus: RequestStatus.PENDING,
      };
    case ActionTypes.ADMIN_GET_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        membersStatus: RequestStatus.SUCCESS,
        members: action.payload.members,
      };
    case ActionTypes.ADMIN_GET_MEMBER_LIST_ERROR:
      return {
        ...state,
        membersStatus: RequestStatus.ERROR,
      };
    case ActionTypes.CREATE_MEMBER_ATTEMPT:
      return {
        ...state,
        createMemberStatus: RequestStatus.PENDING,
      };
    case ActionTypes.CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        createMemberStatus: RequestStatus.SUCCESS,
      };
    case ActionTypes.CREATE_MEMBER_ERROR:
      return {
        ...state,
        createMemberStatus: RequestStatus.ERROR,
      };
    default:
      return state;
  }
};
