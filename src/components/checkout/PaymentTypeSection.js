import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H2, H4, Input } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';

class PaymentTypeSection extends Component {
  constructor(props) {
    super(props);
    const { promoCode, paymentType, price } = props;
    this.state = {
      promoCode,
      paymentType,
      price,
    };
  }

  renderPrices(prices) {
    const { price } = this.state;
    return prices.map((p, i) => {
      return (
        <label key={i}>
          <Input
            type="radio"
            checked={price === p}
            onChange={() => this.setState({ price: p })}
          />
          {`$${p}`}
        </label>
      );
    });
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    const { promoCode, paymentType, price } = this.state;
    const messages = 0;
    // TODO: pricing should be part of the trip object
    const pricing = {
      promoCodes: { please: 'reduced', hike: 'standard', subway: 'half' },
      reduced: { min: 2, max: 30, options: [2, 5, 8] },
      half: { min: 7.5, max: 30, options: [7.5, 10, 15] },
      standard: { min: 15, max: 30, options: [15, 20, 30] },
    };
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
          checked={!prices.includes(price)}
          onChange={() => {
            document.getElementById('customPrice').focus();
            document.getElementById('customPrice').select();
          }}
        />
        <Input
          type="number"
          id="customPrice"
          placeholder="Other amount"
          value={!prices.includes(price) ? price : ''}
          onChange={e => this.setState({ price: e.target.value })}
          onClick={e => this.setState({ price: e.target.value })}
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
          <button onClick={() => onClickNextButton(this.state)}>Next</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  promoCode: state.checkout.promoCode,
  price: state.checkout.price,
});

export default connect(mapStateToProps)(PaymentTypeSection);
