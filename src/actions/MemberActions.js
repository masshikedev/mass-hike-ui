import ActionTypes from './ActionTypes';
import { fetchMemberById, fetchAllMembers, createMember } from '../api/members';

const adminGetAllMembersSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_GET_MEMBER_LIST_SUCCESS,
      payload: {
        members: response.data,
      },
    });
  };
};

const adminGetAllMembersFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_GET_MEMBER_LIST_ERROR });
  };
};

export const adminGetAllMembers = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_GET_MEMBER_LIST_ATTEMPT });
    fetchAllMembers()
      .then(adminGetAllMembersSuccess(dispatch))
      .catch(adminGetAllMembersFailure(dispatch));
  };
};

const adminGetMemberByIdSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_GET_MEMBER_BY_ID_SUCCESS,
      payload: {
        member: response.data,
      },
    });
  };
};

const adminGetMemberByIdFailure = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_GET_MEMBER_BY_ID_ERROR });
  };
};

export const adminGetMemberById = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_GET_MEMBER_BY_ID_ATTEMPT });
    fetchMemberById(id)
      .then(adminGetMemberByIdSuccess(dispatch))
      .catch(adminGetMemberByIdFailure(dispatch));
  };
};

const createMemberSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CREATE_MEMBER_SUCCESS,
    });
  };
};

const createMemberFailure = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CREATE_MEMBER_ERROR,
    });
  };
};

export const createNewMember = member => {
  return dispatch => {
    dispatch({ type: ActionTypes.CREATE_MEMBER_ATTEMPT });
    createMember(member)
      .then(createMemberSuccess(dispatch))
      .catch(createMemberFailure(dispatch));
  };
};
