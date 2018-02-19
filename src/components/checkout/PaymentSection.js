import React, { Component } from 'react';
import { connect } from 'react-redux';
import H2 from '../../style/H2';
import H3 from '../../style/H3';
import H6 from '../../style/H6';
import Input from '../../style/Input';
import Button from '../../style/Button';
import styled from 'styled-components';

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
        <H3>Enter a promo code. (Optional)</H3>
        <Input
          type="text"
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
        />
        <H3>Enter your credit card information</H3>
        <label>
          <H6>Card Number</H6>
          <Input
            type="text"
            value={this.state.cardNumber}
            onChange={e => this.setState({ cardNumber: e.target.value })}
          />
        </label>
        <label>
          <H6>Expiration</H6>
          <Input
            type="text"
            value={this.state.expiration}
            onChange={e => this.setState({ expiration: e.target.value })}
          />
        </label>
        <label>
          <H6>Security Code</H6>
          <Input
            type="text"
            value={this.state.cvv}
            onChange={e => this.setState({ cvv: e.target.value })}
          />
        </label>
        <label>
          <H6>Billing Zip</H6>
          <Input
            type="text"
            value={this.state.billingZip}
            onChange={e => this.setState({ billingZip: e.target.value })}
          />
        </label>
        <br />
        {showNextButton(this.state) && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
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
