import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import trips from '../../data/trips';
import CashPayment from './payments/CashPayment';
import CardPayment from './payments/CardPayment';

class PaymentSection extends Component {
  render() {
    const {
      paymentType,
      showNextButton,
      onClickNextButton,
      tripId,
    } = this.props;
    const Child = paymentType === 'card' ? CardPayment : CashPayment;
    return (
      <div>
        <Child
          showNextButton={showNextButton}
          onClickNextButton={onClickNextButton}
          tripId={tripId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
});

export default connect(mapStateToProps)(PaymentSection);
