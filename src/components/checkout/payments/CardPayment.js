import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../../style';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';

class CardPayment extends Component {
  constructor(props) {
    super(props);
    const { cardNumber, expiration, cvv, billingZip } = props;
    this.state = {
      cardNumber,
      expiration,
      cvv,
      billingZip,
    };
  }

  handleChange = change => {
    console.log(change);
    // find el with id
    // update children to show error
  };

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    return (
      <div>
        <H3>Enter your credit card information</H3>
        <label>
          <H6>Card Number</H6>
          <CardNumberElement onChange={this.handleChange} />
          <P error id="error-cardNumber" />
        </label>
        <label>
          <H6>Expiration</H6>
          <CardExpiryElement onChange={this.handleChange} />
        </label>
        <label>
          <H6>Security Code</H6>
          <CardCVCElement onChange={this.handleChange} />
        </label>
        <label>
          <H6>Billing Zip</H6>
          <PostalCodeElement onChange={this.handleChange} />
        </label>

        {showNextButton(this.state) && (
          <Button onClick={e => onClickNextButton(this.state, e)}>Next</Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

export default connect(mapStateToProps)(CardPayment);
