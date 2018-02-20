import React from 'react';
import { connect } from 'react-redux';
import trips from '../../data/trips';
import { getDate, getTime } from '../../utils/dateFormats';
import { P, H1, H2, H6 } from '../../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  grid-column: span 1;
`;

const CheckoutConfirmation = props => {
  const { tripId } = props;
  const trip = trips[tripId];
  return (
    <div>
      <H2>Trip Summary</H2>
      <Wrapper>
        <Column>
          <P large>
            {trip.name}
            <br />
            {getDate(trip.time.hikeStart)}
            <br />
            {getTime(trip.time.hikeStart)}
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
            {props.preferredContactMethod}
          </P>
        </Column>
      </Wrapper>
      <P large>{`${props.tickets} Tickets`}</P>
      <P large>{`$${props.tickets * trip.price}`}</P>
    </div>
  );
};

const mapStateToProps = state => ({
  name: state.checkout.name,
  email: state.checkout.email,
  phone: state.checkout.phone,
  preferredContactMethod: state.checkout.preferredContactMethod,
  tickets: state.checkout.tickets,
  pickupLocation: state.checkout.pickupLocation,
  promoCode: state.checkout.promoCode,
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

export default connect(mapStateToProps)(CheckoutConfirmation);
