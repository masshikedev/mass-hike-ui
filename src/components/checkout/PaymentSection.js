import React, { Component } from 'react';
import { connect } from 'react-redux';
import CashPayment from './payments/CashPayment';
import CardPayment from './payments/CardPayment';

class PaymentSection extends Component {
  render() {
    const { paymentType } = this.props;
    const Child = paymentType === 'card' ? CardPayment : CashPayment;
    return (
      <div>
        <Child {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
});

export default connect(mapStateToProps)(PaymentSection);
