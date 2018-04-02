import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

export default Wrapped => {
  return connect(mapStateToProps)(function(props) {
    const { loggedIn } = props;
    if (!loggedIn) {
      return <Login />;
    }
    return <Wrapped />;
  });
};

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});
