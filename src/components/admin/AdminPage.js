import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

class AdminPage extends Component {
  render() {
    const { loggedIn, children } = this.props;
    if (!loggedIn) {
      return <Login />;
    }
    return children;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdminPage);
