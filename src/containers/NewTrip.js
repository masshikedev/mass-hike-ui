import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { H2, Container } from '../style';
import AdminPage from '../components/admin/AdminPage';
import TripForm from '../components/admin/TripForm';
import { adminCreateTrip } from '../actions/CurrentTripActions';
import buildTrip from '../utils/buildTrip';

class NewTrip extends Component {
  onConfirm = attributes => {
    const { createTrip } = this.props;
    createTrip(buildTrip(attributes));
  };

  render() {
    return (
      <Container>
        <H2>New Trip</H2>
        <TripForm onConfirm={this.onConfirm} />
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
