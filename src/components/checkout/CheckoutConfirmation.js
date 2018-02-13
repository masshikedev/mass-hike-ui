import React from 'react';
import { connect } from 'react-redux';
import trips from '../../data/trips';
import { getDate, getTime } from '../../utils/dateFormats';

const CheckoutConfirmation = props => {
  const { tripId } = props;
  const trip = trips[tripId];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div style={{ gridColumn: 'span 1' }}>
          <h6>Trip Summary</h6>
          <p>
            {trip.name}
            <br />
            {getDate(trip.time.hikeStart)}
            <br />
            {getTime(trip.time.hikeStart)}
            <br />
          </p>
          <h6>Contact Info</h6>
          <p>
            {props.name}
            <br />
            {props.email}
            <br />
            {props.phone}
          </p>
          <h6>Credit Card</h6>
          <p>
            Card Type<br />
            {props.cardNumber}
          </p>
        </div>
        <div style={{ gridColumn: 'span 1' }}>
          <h6>Pickup</h6>
          <p>{props.pickupLocation}</p>
          <h6>Contact Method</h6>
          <p>{props.preferredContactMethod}</p>
        </div>
      </div>
      <p className="copy-large">{`${props.tickets} Tickets`}</p>
      <p className="copy-large">{`$${props.tickets * trip.price}`}</p>
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
