import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MemberForm from '../components/admin/members/MemberForm';
import LoadableComponent from '../components/LoadableComponent';
import AdminPage from '../components/admin/AdminPage';
import { adminGetMemberById, adminEditMember } from '../actions/MemberActions';
import { AdminContainer, H2 } from '../style';
import styled from 'styled-components';

const Back = styled.span`
  font-size: 18px;
  font-family: 'proxima-nova';
  font-weight: 400;
  text-decoration: underline;
`;

class EditMember extends LoadableComponent {
  componentWillMount() {
    const { getMemberById, match } = this.props;
    getMemberById(match.params.id);
  }

  onSubmit = attributes => {
    const { editMember, member } = this.props;
    editMember(member._id, attributes);
  };

  renderSuccess = () => {
    const { member } = this.props;
    return (
      <AdminContainer>
        <Back>
          <Link to={`/admin/members/${member._id}`}>Back</Link>
        </Back>
        <H2>Edit Member</H2>
        <MemberForm
          buttonText="Confirm"
          onSubmit={this.onSubmit}
          member={member}
        />
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  member: state.members.currentMember,
  status: state.members.currentMemberStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getMemberById: adminGetMemberById, editMember: adminEditMember },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(EditMember)
);
