import React from 'react';
import EditButton from './checkout/EditButton';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR, TIME } from '../utils/dateFormats';
import { P, H2, H6, MediaQueries } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  ${MediaQueries.small} {
    grid-template-columns: auto;
  }
  justify-content: stretch;
`;

const Column = styled.div`
  grid-column: span 1;
`;

const HeadingContainer = styled.div`
  display: flex;
`;

export default function OrderSummary(props) {
  const {
    order,
    showEditButtons,
    mobile,
    cardNumberError,
    cardExpiryError,
    cardCvcError,
    postalCodeError,
  } = props;
  const trip = order.trip;
  return (
    <div>
      <H2>Trip Summary</H2>
      <Wrapper>
        <Column>
          <P large>
            {trip.name}
            <br />
            {format(trip.time.hikeStart, MONTH_DATE_YEAR)}
            <br />
            {format(trip.time.hikeStart, TIME)}
            {' - '}
            {format(trip.time.hikeEnd, TIME)}
            <br />
          </P>
          <HeadingContainer>
            <H6>Contact Info</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P large>
            {order.name}
            <br />
            {order.email}
            <br />
            {order.phone}
          </P>
          <HeadingContainer>
            <H6>Payment</H6>
            <EditButton display={showEditButtons} section={2} mobile={mobile} />
          </HeadingContainer>
          <P>{order.paymentType}</P>
          {order.paymentType === 'card' && (
            <div>
              <H6>Credit Card</H6>
              {cardNumberError && <P error>{cardNumberError.message}</P>}
              {cardExpiryError && <P error>{cardExpiryError.message}</P>}
              {cardCvcError && <P error>{cardCvcError.message}</P>}
              {postalCodeError && <P error>{postalCodeError.message}</P>}
              <P large capitalize>
                {order.cardBrand}
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
          <HeadingContainer>
            <H6>Pickup</H6>
            <EditButton display={showEditButtons} section={1} mobile={mobile} />
          </HeadingContainer>
          <P large>{order.pickupLocation}</P>
          <HeadingContainer>
            <H6>Contact Method</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P large capitalize>
            {order.preferredContactMethods.join(', ')}
          </P>
        </Column>
      </Wrapper>
      <P large>{`${order.tickets} Tickets x $${order.selectedPrice} each`}</P>
      <P large>{`Total: $${order.tickets * order.selectedPrice}`}</P>
    </div>
  );
}
