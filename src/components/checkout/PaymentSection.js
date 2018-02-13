import React, { Component } from 'react';
import { connect } from 'react-redux';

class PaymentSection extends Component {
  constructor(props) {
    super(props);
    const { promoCode, cardNumber, expiration, cvv, billingZip } = props;
    this.state = {
      promoCode,
      cardNumber,
      expiration,
      cvv,
      billingZip,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    return (
      <div>
        <h3>Enter a promo code. (Optional)</h3>
        <input
          type="text"
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
        />
        <h3>Enter your credit card information</h3>
        <label>
          <h6>Card Number</h6>
          <input
            type="text"
            value={this.state.cardNumber}
            onChange={e => this.setState({ cardNumber: e.target.value })}
          />
        </label>
        <label>
          <h6>Expiration</h6>
          <input
            type="text"
            value={this.state.expiration}
            onChange={e => this.setState({ expiration: e.target.value })}
          />
        </label>
        <label>
          <h6>Security Code</h6>
          <input
            type="text"
            value={this.state.cvv}
            onChange={e => this.setState({ cvv: e.target.value })}
          />
        </label>
        <label>
          <h6>Billing Zip</h6>
          <input
            type="text"
            value={this.state.billingZip}
            onChange={e => this.setState({ billingZip: e.target.value })}
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
  promoCode: state.checkout.promoCode,
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

export default connect(mapStateToProps)(PaymentSection);
