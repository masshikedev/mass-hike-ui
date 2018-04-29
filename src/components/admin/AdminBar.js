import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout } from '../../actions/AuthActions';
import styled from 'styled-components';

const AdminBarContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 40px;
  z-index: 9999;
`;

const AdminBarItem = styled.button`
  border: none;
  text-decoration: underline;
  font-size: 14px;
  font-family: 'Open Sans';
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

class AdminBar extends Component {
  render() {
    const {
      loggedIn,
      logout,
      toDashboard,
      toTrips,
      toMembers,
      toAvailability,
    } = this.props;
    if (!loggedIn) {
      return null;
    }
    return (
      <AdminBarContainer>
        <AdminBarItem onClick={toDashboard}>Dashboard</AdminBarItem>
        <AdminBarItem onClick={toTrips}>Trips</AdminBarItem>
        <AdminBarItem onClick={toMembers}>Members</AdminBarItem>
        <AdminBarItem onClick={toAvailability}>Availability</AdminBarItem>
        <AdminBarItem onClick={logout}>Logout</AdminBarItem>
      </AdminBarContainer>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      toDashboard: () => push('/admin'),
      toTrips: () => push('/admin/trips'),
      toMembers: () => push('/admin/members'),
      toAvailability: () => push('/admin/availability'),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminBar);
