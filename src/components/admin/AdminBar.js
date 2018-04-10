import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/AuthActions';
import styled from 'styled-components';

const AdminBarContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 40px;
`;

const LogoutButton = styled.button`
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
    const { loggedIn, logout } = this.props;
    if (!loggedIn) {
      return null;
    }
    return (
      <AdminBarContainer>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </AdminBarContainer>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminBar);
