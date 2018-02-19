import React from 'react';
import { connect } from 'react-redux';
import trips from '../../data/trips';
import { getDate, getTime } from '../../utils/dateFormats';
import P from '../../style/P';
import H2 from '../../style/H2';
import H6 from '../../style/H6';

const Info = P.extend`
  font-size: large;
`;

const CapitalizeInfo = Info.extend`
  text-transform: capitalize;
`;

const CheckoutConfirmation = props => {
  const { tripId } = props;
  const trip = trips[tripId];
  return (
    <div>
      <H2>Trip Summary</H2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div style={{ gridColumn: 'span 1' }}>
          <Info>
            {trip.name}
            <br />
            {getDate(trip.time.hikeStart)}
            <br />
            {getTime(trip.time.hikeStart)}
            <br />
          </Info>
          <H6>Contact Info</H6>
          <Info>
            {props.name}
            <br />
            {props.email}
            <br />
            {props.phone}
          </Info>
          <H6>Credit Card</H6>
          <Info>
            Card Type
            <br />
            {props.cardNumber}
          </Info>
        </div>
        <div style={{ gridColumn: 'span 1' }}>
          <H6>Pickup</H6>
          <Info>{props.pickupLocation}</Info>
          <H6>Contact Method</H6>
          <CapitalizeInfo>{props.preferredContactMethod}</CapitalizeInfo>
        </div>
      </div>
      <Info className="copy-large">{`${props.tickets} Tickets`}</Info>
      <Info className="copy-large">{`${props.tickets * trip.price}`}</Info>
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
