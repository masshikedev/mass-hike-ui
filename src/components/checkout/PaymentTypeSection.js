import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H2, H3, H4, H6, Input } from '../../style';

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
          {`\$${p}`}
        </label>
      );
    });
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    const { promoCode, paymentType, price } = this.state;
    const prices = promoCode.length > 0 ? [2, 5, 10] : [15, 20, 30];

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
          {`Enter a value between $${Math.min(...prices)} and $${Math.max(
            ...prices
          )}.`}
        </H4>

        {this.renderPrices(prices)}

        <br />
        <Input
          type="number"
          id="customPrice"
          placeholder="Other amount"
          value={!prices.includes(price) ? price : ''}
          onChange={e => this.setState({ price: e.target.value })}
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
