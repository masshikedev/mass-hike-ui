import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Th, Tr, Td, H5 } from '../../style';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../../utils/dateFormats';

class TripGrid extends Component {
  renderTrip(trip) {
    const { showTickets } = this.props;
    return (
      <Tr key={trip.tripId}>
        <Td>
          <Link to={`/admin/trips/${trip.tripId}/ticketing`}>{trip.name}</Link>
        </Td>
        <Td>{moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}</Td>
        <Td>{showTickets && trip.capacity - trip.ticketsSold}</Td>
      </Tr>
    );
  }

  tripFilter(trip, search) {
    const query = search.toLowerCase();
    return (
      trip.name.toLowerCase().includes(query) ||
      trip.location.toLowerCase().includes(query) ||
      moment(trip.time.hikeStart)
        .format(MONTH_DATE_YEAR)
        .toLowerCase()
        .includes(query) ||
      trip.difficulty.toLowerCase().includes(query)
    );
  }

  filteredTrips() {
    const { search, trips } = this.props;
    if (!search) {
      return trips;
    }
    return trips.filter(trip => this.tripFilter(trip, search));
  }

  render() {
    const { showTickets, title } = this.props;
    const trips = this.filteredTrips();
    return (
      <div>
        {title && <H5>{title}</H5>}
        <Table fixed>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>{showTickets && 'Remaining Tickets'}</Th>
            </Tr>
          </thead>
          <tbody>{trips.map(trip => this.renderTrip(trip))}</tbody>
        </Table>
      </div>
    );
  }
}

export default TripGrid;
