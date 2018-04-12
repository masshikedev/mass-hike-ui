import React from 'react';
import EditButton from './checkout/EditButton';
import moment from 'moment';
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
  const { order, showEditButtons, mobile, errors } = props;
  const trip = order.trip;
  return (
    <div>
      <H2>Trip Summary</H2>
      <Wrapper>
        <Column>
          <P large>
            {trip.name}
            <br />
            {moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}
            <br />
            {moment(trip.time.hikeStart).format(TIME)}
            {' - '}
            {moment(trip.time.hikeEnd).format(TIME)}
            <br />
          </P>
          <HeadingContainer>
            <H6>Contact Info</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P large>{order.name} </P>
          {errors && errors['name'] && <P error>{errors['name'][0]}</P>}
          <P large>{order.email}</P>
          {errors && errors['email'] && <P error>{errors['email'][0]}</P>}
          <P large>{order.phone}</P>
          {errors && errors['phone'] && <P error>{errors['phone'][0]}</P>}
          <HeadingContainer>
            <H6>Payment</H6>
            <EditButton display={showEditButtons} section={2} mobile={mobile} />
          </HeadingContainer>
          <P>{order.paymentType}</P>
          {errors &&
            errors['paymentType'] && <P error>{errors['paymentType'][0]}</P>}
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
          {errors &&
            errors['preferredContactMethods'] && (
              <P error>{errors['preferredContactMethods'][0]}</P>
            )}
        </Column>
      </Wrapper>
      <P large>{`${order.tickets} Tickets x $${order.selectedPrice} each`}</P>
      {errors && errors['tickets'] && <P error>{errors['tickets'][0]}</P>}
      {errors &&
        errors['selectedPrice'] && <P error>{errors['selectedPrice'][0]}</P>}
      <P large>{`Total: $${order.tickets * order.selectedPrice}`}</P>
    </div>
  );
}
