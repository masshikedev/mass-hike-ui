import ActionTypes from './ActionTypes';
import {
  fetchMemberById,
  fetchAllMembers,
  createMember,
  updateMember,
} from '../api/members';
import { push } from 'react-router-redux';

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

const adminCreateMemberSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CREATE_MEMBER_SUCCESS,
    });
    const id = response.data._id;
    dispatch(push(`/admin/members/${id}`));
  };
};

const createMemberFailure = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.CREATE_MEMBER_ERROR,
    });
  };
};

export const createNewMember = (member, admin) => {
  const success = admin ? adminCreateMemberSuccess : createMemberSuccess;
  return dispatch => {
    dispatch({ type: ActionTypes.CREATE_MEMBER_ATTEMPT });
    createMember(member)
      .then(success(dispatch))
      .catch(createMemberFailure(dispatch));
  };
};

const adminUpdateMemberSuccess = dispatch => {
  return response => {
    dispatch({
      type: ActionTypes.ADMIN_UPDATE_MEMBER_SUCCESS,
    });
    const id = response.data.value._id;
    dispatch(push(`/admin/members/${id}`));
  };
};

const adminUpdateMemberError = dispatch => {
  return () => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_MEMBER_ERROR });
  };
};

export const adminEditMember = (id, attributes) => {
  return dispatch => {
    dispatch({ type: ActionTypes.ADMIN_UPDATE_MEMBER_ATTEMPT });
    updateMember(id, attributes)
      .then(adminUpdateMemberSuccess(dispatch))
      .catch(adminUpdateMemberError(dispatch));
  };
};
