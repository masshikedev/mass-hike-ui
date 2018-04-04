import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/admin/Login';
import { H3, Container } from '../style';

class Admin extends Component {
  render() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return <Login />;
    }
    return (
      <Container>
        <H3>Logged in</H3>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Admin);
