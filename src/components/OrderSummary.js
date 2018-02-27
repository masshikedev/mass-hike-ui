import React, { Component } from 'react';
import { connect } from 'react-redux';
import trips from '../data/trips';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR, TIME } from '../utils/dateFormats';
import { P, H2, H6 } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  grid-column: span 1;
`;

function OrderSummary(props) {
  const { tripId } = props;
  const trip = trips[tripId];
  return (
    <div>
      <H2>Order Summary</H2>
      <Wrapper>
        <Column>
          <P large>
            {trip.name}
            <br />
            {format(trip.time.hikeStart, MONTH_DATE_YEAR)}
            <br />
            {format(trip.time.hikeStart, TIME)}
            <br />
          </P>
          <H6>Contact Info</H6>
          <P large>
            {props.name}
            <br />
            {props.email}
            <br />
            {props.phone}
          </P>
          <H6>Payment Type</H6>
          <P>{props.paymentType}</P>
          <H6>Credit Card</H6>
          <P large>
            Card Type
            <br />
            {props.cardNumber}
          </P>
        </Column>
        <Column>
          <H6>Pickup</H6>
          <P large>{props.pickupLocation}</P>
          <H6>Contact Method</H6>
          <P large capitalize>
            {props.preferredContactMethods.join(', ')}
          </P>
        </Column>
      </Wrapper>
      <P large>{`${props.tickets} Tickets`}</P>
      <P large>{`$${props.tickets * trip.price}`}</P>
    </div>
  );
}

export default OrderSummary;