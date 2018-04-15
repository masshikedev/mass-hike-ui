import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Th, Tr, Td } from '../../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../../utils/dateFormats';

class TripGrid extends Component {
  renderTrip(trip) {
    const { showTickets } = this.props;
    return (
      <Tr key={trip.tripId}>
        <Td>{trip.name}</Td>
        <Td>{moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}</Td>
        <Td>{showTickets && trip.capacity - trip.ticketsSold}</Td>
        <Td>
          <Link to={`/admin/trips/${trip.tripId}`}>details</Link>
        </Td>
      </Tr>
    );
  }

  render() {
    const { trips, showTickets } = this.props;
    return (
      <Table fixed>
        <Tr>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>{showTickets && 'Remaining Tickets'}</Th>
          <Th />
        </Tr>
        {trips.map(trip => this.renderTrip(trip))}
      </Table>
    );
  }
}

export default TripGrid;