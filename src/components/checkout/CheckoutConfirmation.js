import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../OrderSummary';
import BaseCheckoutSection from './BaseCheckoutSection';
import { Button } from '../../style';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { confirmOrder } from '../../actions/OrderActions';
import { bindActionCreators } from 'redux';
import { P, H2 } from '../../style';
import { RequestStatus } from '../../constants';
import { validate } from 'validate.js';
import { constraints } from '../../utils/validationConstraints';
import getCurrentPricing from '../../utils/getCurrentPricing';

class CheckoutConfirmation extends BaseCheckoutSection {
  handleConfirmOrder = e => {
    const { order, confirmOrder, status, stripeCreateToken } = this.props;
    e.preventDefault();
    if (
      status === RequestStatus.UNITIALIZED ||
      status === RequestStatus.ERROR
    ) {
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
      availability,
    } = this.props;
    const { trip } = order;
    const pricing = this.currentPricing();
    const errors =
      validate({ ...order }, constraints(trip, pricing, availability, order)) ||
      'valid';
    return (
      <div>
        {status === RequestStatus.ERROR && (
          <P proxima bold color="error">
            Error placing order. Please check that your credit card details have
            been entered correctly.
          </P>
        )}
        <H2>Order Summary</H2>
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
        {!this.cardDetailsValid() || errors !== 'valid' ? (
          <P color="error" proxima>
            One or more of your responses is missing or incorect.
            {(errors.meetingDate !== null ||
              errors.selectedLocationIndex !== null) &&
              " Please assure you've filled out the cash payment section."}
          </P>
        ) : (
          <Button onClick={this.handleConfirmOrder}>Confirm Order</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { checkout, orders, currentTrip, availability } = state;
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
        availability.locations && checkout.selectedLocationIndex >= 0
          ? availability.locations[checkout.selectedLocationIndex]
          : '',
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
    availability,
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
