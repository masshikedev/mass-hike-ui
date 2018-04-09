import React, { Component } from 'react';
import AdminPage from '../components/admin/AdminPage';
import { Container, H3 } from '../style';

class AdminTripDetail extends Component {
  render() {
    return (
      <Container>
        <H3>Trip Created</H3>
      </Container>
    );
  }
}

export default AdminPage(AdminTripDetail);
