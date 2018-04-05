import React, { Component } from 'react';
import { connect } from 'react-redux';
import CashPayment from './payments/CashPayment';
import CardPayment from './payments/CardPayment';
import BaseCheckoutSection from './BaseCheckoutSection';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { bindActionCreators } from 'redux';

class PaymentSection extends BaseCheckoutSection {
  render() {
    const { paymentType } = this.props;
    return (
      <div>
        {paymentType === 'cash' ? <CashPayment {...this.props} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSection);
