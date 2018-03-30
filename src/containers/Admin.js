import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/admin/Login';
import AdminDashboard from '../components/admin/AdminDashboard';
import { H2, H3, Container, GridParent } from '../style';

class Admin extends Component {
  render() {
    const { loggedIn, upcomingTrips, pastTrips } = this.props;
    if (!loggedIn) {
      return <Login />;
    }
    return <AdminDashboard />;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Admin);
