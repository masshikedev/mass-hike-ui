import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H2, H4, Input } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';

class PaymentTypeSection extends Component {
  constructor(props) {
    super(props);
    const { promoCode, paymentType, selectedPrice } = props;
    this.state = {
      promoCode,
      paymentType,
      selectedPrice,
    };
  }

  renderPrices(prices) {
    const { selectedPrice } = this.state;
    return prices.map((p, i) => {
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
    const { showNextButton, onClickNextButton, trip } = this.props;
    const { promoCode, paymentType, selectedPrice } = this.state;
    const messages = 0;
    const pricing = trip.pricing;
    const priceData =
      pricing[pricing.promoCodes[promoCode]] || pricing.standard;
    const prices = priceData.options;
    return (
      <div>
        <H2>Enter a promo code. (Optional)</H2>
        <Input
          type="text"
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
        />
        <H2>Choose your ticket price.</H2>
        <H4>
          {`Enter a value between $${priceData.min} and $${priceData.max}.`}
        </H4>

        {this.renderPrices(prices)}

        <br />
        <Input
          type="radio"
          checked={!prices.includes(selectedPrice)}
          onChange={() => {
            document.getElementById('customPrice').focus();
            document.getElementById('customPrice').select();
          }}
        />
        <Input
          type="number"
          id="customPrice"
          placeholder="Other amount"
          value={!prices.includes(selectedPrice) ? selectedPrice : ''}
          onChange={e => this.setState({ selectedPrice: e.target.value })}
          onClick={e => this.setState({ selectedPrice: e.target.value })}
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
        {showNextButton(this.state) && (
          <button onClick={e => onClickNextButton(this.state, e)}>Next</button>
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

export default connect(mapStateToProps)(PaymentTypeSection);
