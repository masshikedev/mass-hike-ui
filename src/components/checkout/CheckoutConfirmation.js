import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../OrderSummary';
import { Button } from '../../style';
import { confirmOrder } from '../../actions/OrderActions';
import { bindActionCreators } from 'redux';
import { H3 } from '../../style';
import { RequestStatus } from '../../constants';

class CheckoutConfirmation extends Component {
  handleConfirmOrder = e => {
    const { order, confirmOrder, status } = this.props;
    e.preventDefault();
    if (status === RequestStatus.UNITIALIZED) {
      confirmOrder(order);
    }
  };

  render() {
    const { order, trip, status } = this.props;
    return (
      <div>
        {status === RequestStatus.ERROR && <H3>Error placing order</H3>}
        <OrderSummary order={order} trip={trip} />
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
      cardNumber: checkout.cardNumber,
      price: checkout.price,
      meetingLocation:
        currentTrip.trip.cashLocations[checkout.selectedLocationIndex],
      meetingDate: checkout.meetingDate,
      tripId: currentTrip.trip.tripId,
      trip: currentTrip.trip,
    },
    status: orders.confirmOrderStatus,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      confirmOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutConfirmation
);
