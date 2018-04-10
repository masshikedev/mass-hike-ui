import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';

export default Wrapped => {
  return connect(mapStateToProps)(function(props) {
    const { loggedIn } = props;
    if (!loggedIn) {
      return <Login />;
    }
    return <Wrapped {...props} />;
  });
};

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});
