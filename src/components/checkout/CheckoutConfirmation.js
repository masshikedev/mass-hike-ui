import React from 'react';
import { connect } from 'react-redux';
import trips from '../../data/trips';
import P from '../../style/P';
import H6 from '../../style/H6';
import { format } from 'date-fns';
import dateFormats from '../../data/dateFormats';

const CheckoutConfirmation = props => {
  const { tripId } = props;
  const trip = trips[tripId];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div style={{ gridColumn: 'span 1' }}>
          <H6>Trip Summary</H6>
          <P>
            {trip.name}
            <br />
            {format(trip.time.hikeStart, dateFormats.MONTH_DATE_YEAR)}
            <br />
            {format(trip.time.hikeStart, dateFormats.TIME)}
            <br />
          </P>
          <H6>Contact Info</H6>
          <P>
            {props.name}
            <br />
            {props.email}
            <br />
            {props.phone}
          </P>
          <H6>Credit Card</H6>
          <P>
            Card Type<br />
            {props.cardNumber}
          </P>
        </div>
        <div style={{ gridColumn: 'span 1' }}>
          <H6>Pickup</H6>
          <P>{props.pickupLocation}</P>
          <H6>Contact Method</H6>
          <P>{props.preferredContactMethod}</P>
        </div>
      </div>
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
