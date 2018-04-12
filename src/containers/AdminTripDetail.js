import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadableComponent from '../components/LoadableComponent';
import AdminPage from '../components/admin/AdminPage';
import OrderGrid from '../components/admin/OrderGrid';
import PickupMap from '../components/admin/PickupMap';
import PickupGrid from '../components/admin/PickupGrid';
import { adminGetTripById } from '../actions/CurrentTripActions';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';
import { AdminContainer, H2, H3, P } from '../style';
import styled from 'styled-components';

class AdminTripDetail extends LoadableComponent {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  renderSuccess = () => {
    const { trip } = this.props;
    const dateString = moment.utc(trip.time.hikeStart).format(MONTH_DATE_YEAR);
    return (
      <AdminContainer>
        <H2>{trip.name}</H2>
        <P large>{`${dateString} - ${trip.location}`}</P>
        <H3>Ticket Sales</H3>
        <OrderGrid orders={trip.orders} capacity={trip.capacity} />
        <H3>Pickup Locations</H3>
        <PickupMap orders={trip.orders} />
        <PickupGrid orders={trip.orders} />
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  status: state.currentTrip.adminStatus,
  trip: state.currentTrip.adminTrip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTripById: adminGetTripById }, dispatch);

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminTripDetail)
);
