import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../OrderSummary';
import BaseCheckoutSection from './BaseCheckoutSection';
import { Button } from '../../style';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { confirmOrder } from '../../actions/OrderActions';
import { bindActionCreators } from 'redux';
import { P, H3 } from '../../style';
import { RequestStatus } from '../../constants';
import { validate } from 'validate.js';
import { constraints } from '../../utils/validationConstraints';

class CheckoutConfirmation extends BaseCheckoutSection {
  handleConfirmOrder = e => {
    const { order, confirmOrder, status } = this.props;
    e.preventDefault();
    if (status === RequestStatus.UNITIALIZED) {
      confirmOrder(order);
    }
  };

  render() {
    const { order, status, mobile } = this.props;
    const { promoCode, trip } = order;
    const pricing = trip.pricing;
    const priceData =
      pricing[pricing.promoCodes[promoCode]] || pricing.standard;
    const errors = validate({ ...order }, constraints(trip, priceData)) || {};
    return (
      <div>
        {status === RequestStatus.ERROR && <H3>Error placing order</H3>}
        <OrderSummary
          order={order}
          trip={trip}
          errors={errors}
          mobile={mobile}
          showEditButtons
        />
        {errors ? (
          <P error>An error has occured. Please check your responses.</P>
        ) : (
          <Button onClick={this.handleConfirmOrder}>Confirm Order</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { checkout, orders, currentTrip } = state;
  return {
    order: {
      name: checkout.name,
      email: checkout.email,
      phone: checkout.phone,
      preferredContactMethods: checkout.preferredContactMethods,
      paymentType: checkout.paymentType,
      tickets: checkout.tickets,
      pickupLocation: checkout.pickupLocation,
      zipCode: checkout.zipCode,
      cardNumber: checkout.cardNumber,
      selectedPrice: checkout.selectedPrice,
      meetingLocation:
        currentTrip.trip.cashLocations[checkout.selectedLocationIndex],
      meetingDate: checkout.meetingDate,
      tripId: currentTrip.trip.tripId,
      trip: currentTrip.trip,
      promoCode: checkout.promoCode,
    },
    status: orders.confirmOrderStatus,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      confirmOrder,
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutConfirmation
);
