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
import getCurrentPricing from '../../utils/getCurrentPricing';

class CheckoutConfirmation extends BaseCheckoutSection {
  handleConfirmOrder = e => {
    const { order, confirmOrder, status, stripeCreateToken } = this.props;
    e.preventDefault();
    if (status === RequestStatus.UNITIALIZED) {
      order.paymentType === 'card'
        ? stripeCreateToken(token =>
            confirmOrder({ ...order, stripeToken: token })
          )
        : confirmOrder(order);
    }
  };

  currentPricing() {
    const { order } = this.props;
    return getCurrentPricing(order.promoCode, order.trip);
  }

  cardDetailsValid = () => {
    const {
      cardNumberError,
      cardExpiryError,
      cardCvcError,
      postalCodeError,
      order,
    } = this.props;
    return (
      !(
        cardNumberError ||
        cardExpiryError ||
        cardCvcError ||
        postalCodeError
      ) || order.paymentType !== 'card'
    );
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
    const { promoCode, trip } = order;
    const pricing = this.currentPricing();
    const errors =
      validate({ ...order }, constraints(trip, pricing)) || 'valid';
    return (
      <div>
        {status === RequestStatus.ERROR && <H3>Error placing order</H3>}
        <OrderSummary
          order={order}
          trip={trip}
          errors={errors}
          mobile={mobile}
          cardNumberError={cardNumberError}
          cardExpiryError={cardExpiryError}
          cardCvcError={cardCvcError}
          postalCodeError={postalCodeError}
          showEditButtons
        />
        {!this.cardDetailsValid() && errors !== 'valid' ? (
          <P color="error" proxima>
            An error has occured. Please check your responses.
          </P>
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
      tickets: +checkout.tickets,
      kids: +checkout.kids,
      pickupLocation: checkout.pickupLocation,
      zipCode: checkout.zipCode,
      cardBrand: checkout.cardNumber.brand,
      selectedPrice: checkout.selectedPrice,
      meetingLocation:
        currentTrip.trip.cashLocations[checkout.selectedLocationIndex],
      meetingDate: checkout.meetingDate,
      tripId: currentTrip.trip.tripId,
      trip: currentTrip.trip,
      promoCode: checkout.promoCode,
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
