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

const mapStateToProps = state => ({
  order: {
    name: state.checkout.name,
    email: state.checkout.email,
    phone: state.checkout.phone,
    preferredContactMethods: state.checkout.preferredContactMethods,
    paymentType: state.checkout.paymentType,
    tickets: state.checkout.tickets,
    pickupLocation: state.checkout.pickupLocation,
    cardNumber: state.checkout.cardNumber,
    price: state.checkout.price,
    selectedLocation: state.checkout.selectedLocation,
    meetingDate: state.checkout.meetingDate,
    tripId: state.currentTrip.trip.tripId,
    trip: state.currentTrip.trip,
  },
  status: state.orders.confirmOrderStatus,
});

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
