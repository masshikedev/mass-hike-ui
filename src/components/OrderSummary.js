import React from 'react';
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
  const { order } = props;
  const trip = order.trip;
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
            {order.name}
            <br />
            {order.email}
            <br />
            {order.phone}
          </P>
          <H6>Payment Type</H6>
          <P>{order.paymentType}</P>
          {order.paymentType === 'card' && (
            <div>
              <H6>Credit Card</H6>
              <P large>
                Card Type
                <br />
                {order.cardNumber}
              </P>
            </div>
          )}
          {order.paymentType === 'cash' && (
            <div>
              <P large>{order.meetingDate}</P>
              <P large>{order.meetingLocation.name}</P>
            </div>
          )}
        </Column>
        <Column>
          <H6>Pickup</H6>
          <P large>{order.pickupLocation}</P>
          <H6>Contact Method</H6>
          <P large capitalize>
            {order.preferredContactMethods.join(', ')}
          </P>
        </Column>
      </Wrapper>
      <P large>{`${order.tickets} Tickets`}</P>
      <P large>{`$${order.tickets * order.selectedPrice}`}</P>
    </div>
  );
}

export default OrderSummary;
