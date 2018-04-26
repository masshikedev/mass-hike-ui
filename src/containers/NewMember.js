import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MemberForm from '../components/admin/members/MemberForm';
import AdminPage from '../components/admin/AdminPage';
import { createNewMember } from '../actions/MemberActions';
import { AdminContainer, H2 } from '../style';

class NewMember extends Component {
  onSubmit = member => {
    const { createNewMember } = this.props;
    createNewMember(member);
  };

  render() {
    return (
      <AdminContainer>
        <H2>New Member</H2>
        <MemberForm buttonText="Create member" onSubmit={this.onSubmit} />
      </AdminContainer>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { createNewMember: member => createNewMember(member, true) },
    dispatch
  );

export default AdminPage(connect(null, mapDispatchToProps)(NewMember));
