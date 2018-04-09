import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { H2, H4, Input, Button } from '../../style';
import { validate } from 'validate.js';
import { paymentTypeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';

class PaymentTypeSection extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { promoCode, paymentType, selectedPrice } = props;
    this.state = {
      promoCode,
      paymentType,
      selectedPrice,
    };
  }

  currentPricing() {
    const { promoCode } = this.state;
    const promoCodes = this.props.trip.promoCodes;
    for (let i = 0; i < promoCodes.length; i++) {
      if (promoCode === promoCodes[i].promoCode) {
        return promoCodes[i];
      }
    }
    return this.props.trip.pricing;
  }

  pricingSuggestions() {
    const { suggestion1, suggestion2, suggestion3 } = this.currentPricing();
    return [suggestion1, suggestion2, suggestion3];
  }

  renderPrices(prices) {
    const { selectedPrice } = this.state;
    return this.pricingSuggestions().map((p, i) => {
      return (
        <label key={i}>
          <Input
            type="radio"
            checked={selectedPrice === p}
            onChange={() => this.setState({ selectedPrice: p })}
          />
          {`$${p}`}
        </label>
      );
    });
  }

  render() {
    const { trip } = this.props;
    const { paymentType, selectedPrice } = this.state;
    const pricing = this.currentPricing();
    const messages =
      validate(this.state, paymentTypeConstraints(trip, pricing)) || 'valid';
    return (
      <div>
        <H2>Enter a promo code. (Optional)</H2>
        <ValidatedTextInput
          title=""
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
          error={messages['promoCode']}
        />
        <H2>Choose your ticket price.</H2>
        <H4>{`Enter a value between $${pricing.min} and $${pricing.max}.`}</H4>

        {this.renderPrices()}

        <br />
        <Input
          type="radio"
          checked={!this.pricingSuggestions().includes(selectedPrice)}
          onChange={() => {
            document.getElementById('customPrice').focus();
            document.getElementById('customPrice').select();
          }}
        />
        <ValidatedTextInput
          type="number"
          id="customPrice"
          placeholder="Other amount"
          value={
            !this.pricingSuggestions().includes(selectedPrice)
              ? selectedPrice
              : ''
          }
          onChange={e => this.setState({ selectedPrice: e.target.value })}
          onFocus={e => this.setState({ selectedPrice: e.target.value })}
          error={messages['selectedPrice']}
        />

        <H2>How would you like to pay?</H2>
        <label>
          Credit/Debit
          <Input
            type="radio"
            checked={paymentType === 'card'}
            onChange={() => this.setState({ paymentType: 'card' })}
          />
        </label>
        <label>
          Cash
          <Input
            type="radio"
            checked={paymentType !== 'card'}
            onChange={() => this.setState({ paymentType: 'cash' })}
          />
        </label>
        <br />
        {messages === 'valid' && (
          <Button onClick={this.onCompleteSection}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  promoCode: state.checkout.promoCode,
  selectedPrice: state.checkout.selectedPrice,
  trip: state.currentTrip.trip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTypeSection);
