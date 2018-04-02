import React from 'react';
import { H2, Container } from '../style';
import AdminPage from '../components/admin/AdminPage';
import TripForm from '../components/admin/TripForm';

function NewTrip(props) {
  return (
    <Container>
      <H2>New Trip</H2>
      <TripForm />
    </Container>
  );
}

export default AdminPage(NewTrip);
