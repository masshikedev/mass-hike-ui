import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../OrderSummary';
import BaseCheckoutSection from './BaseCheckoutSection';
import { Button } from '../../style';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { confirmOrder } from '../../actions/OrderActions';
import { bindActionCreators } from 'redux';
import { H3 } from '../../style';
import { RequestStatus } from '../../constants';

class CheckoutConfirmation extends BaseCheckoutSection {
  handleConfirmOrder = e => {
    const { order, confirmOrder, status, stripeCreateToken } = this.props;
    e.preventDefault();
    if (status === RequestStatus.UNITIALIZED) {
      stripeCreateToken(token =>
        confirmOrder({ ...order, stripeToken: token })
      );
    }
  };

  render() {
    const {
      order,
      status,
      mobile,
      cardNumberError,
      cardExpiryError,
      cardCvcError,
      postalCodeError,
    } = this.props;
    return (
      <div>
        {status === RequestStatus.ERROR && <H3>Error placing order</H3>}
        <OrderSummary
          order={order}
          showEditButtons
          mobile={mobile}
          cardNumberError={cardNumberError}
          cardExpiryError={cardExpiryError}
          cardCvcError={cardCvcError}
          postalCodeError={postalCodeError}
        />
        <Button onClick={this.handleConfirmOrder}>Confirm Order</Button>
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
      cardBrand: checkout.cardNumber.brand,
      selectedPrice: checkout.selectedPrice,
      meetingLocation:
        currentTrip.trip.cashLocations[checkout.selectedLocationIndex],
      meetingDate: checkout.meetingDate,
      tripId: currentTrip.trip.tripId,
      trip: currentTrip.trip,
    },
    cardNumberError: checkout.cardNumber.error,
    cardExpiryError: checkout.cardExpiry.error,
    cardCvcError: checkout.cardCvc.error,
    postalCodeError: checkout.postalCode.error,
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
