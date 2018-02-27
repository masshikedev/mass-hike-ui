import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../OrderSummary';
import { Button } from '../../style';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

function CheckoutConfirmation(props) {
  const id = 'dummy1';
  const { toOrderConfirmation } = props;
  return (
    <div>
      <OrderSummary {...props} />
      <Button onClick={() => toOrderConfirmation(id)}>Confirm Order</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  name: state.checkout.name,
  email: state.checkout.email,
  phone: state.checkout.phone,
  preferredContactMethods: state.checkout.preferredContactMethods,
  paymentType: state.checkout.paymentType,
  tickets: state.checkout.tickets,
  pickupLocation: state.checkout.pickupLocation,
  promoCode: state.checkout.promoCode,
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toOrderConfirmation: id => push(`/order/${id}`),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutConfirmation
);
