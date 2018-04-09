import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { H2, Container } from '../style';
import AdminPage from '../components/admin/AdminPage';
import TripForm from '../components/admin/TripForm';
import { adminCreateTrip } from '../actions/CurrentTripActions';

class NewTrip extends Component {
  render() {
    const { createTrip } = this.props;
    return (
      <Container>
        <H2>New Trip</H2>
        <TripForm onConfirm={createTrip} />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createTrip: adminCreateTrip,
    },
    dispatch
  );

export default AdminPage(connect(null, mapDispatchToProps)(NewTrip));
