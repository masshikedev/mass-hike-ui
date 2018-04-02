import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridParent, H6 } from '../../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR, TIME } from '../../utils/dateFormats';

const TripGridWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const TripGridRow = GridParent.extend`
  font-size: 16px;
`;

const Column = styled.div`
  grid-column: span 3;
  padding-bottom: 20px;
`;

class TripGrid extends Component {
  renderTrip(trip) {
    const { showTickets } = this.props;
    return (
      <TripGridRow key={trip.tripId}>
        <Column>{trip.name}</Column>
        <Column>{moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}</Column>
        <Column>{showTickets && trip.capacity - trip.orders.length}</Column>
        <Column>
          <Link to="/">details</Link>
        </Column>
      </TripGridRow>
    );
  }

  render() {
    const { trips, showTickets } = this.props;
    return (
      <TripGridWrapper>
        <TripGridRow>
          <Column>
            <H6>Name</H6>
          </Column>
          <Column>
            <H6>Date</H6>
          </Column>
          <Column>{showTickets && <H6>Remaining Tickets</H6>}</Column>
          <Column />
        </TripGridRow>
        {trips.map(trip => this.renderTrip(trip))}
      </TripGridWrapper>
    );
  }
}

export default TripGrid;
