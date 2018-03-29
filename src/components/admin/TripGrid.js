import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridParent, H6 } from '../../style';
import styled from 'styled-components';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR, TIME } from '../../utils/dateFormats';

const TripGridParent = GridParent.extend`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 16px;
`;

const Column = styled.div`
  grid-column: span 3;
  padding-bottom: 20px;
`;

class TripGrid extends Component {
  renderTrip(trip) {
    const { showTickets } = this.props;
    return [
      <Column>{trip.name}</Column>,
      <Column>{format(trip.time.hikeStart, MONTH_DATE_YEAR)}</Column>,
      <Column>{showTickets && trip.capacity - trip.orders.length}</Column>,
      <Column>
        <Link to="/">details</Link>
      </Column>,
    ];
  }

  render() {
    const { trips, showTickets } = this.props;
    return (
      <TripGridParent>
        <Column>
          <H6>Name</H6>
        </Column>
        <Column>
          <H6>Date</H6>
        </Column>
        <Column>{showTickets && <H6>Remaining Tickets</H6>}</Column>
        <Column />
        {trips.map(trip => this.renderTrip(trip))}
      </TripGridParent>
    );
  }
}

export default TripGrid;
