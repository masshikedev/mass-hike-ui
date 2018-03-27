import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import { setCurrentSection } from '../../../actions/CheckoutActions';
import { H3, H6, Input, Button } from '../../../style';

class CardPayment extends BaseCheckoutSection {
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
    let id = 'error-' + change.elementType;
    let errorElement = document.getElementById(id);

    // update children to show error
    if (change.error) {
      errorElement.textContent = change.error.message;
    } else {
      errorElement.textContent = '';
    }
  };

  render() {
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
          <P error id="error-cardExpiry" />
        </label>
        <label>
          <H6>Security Code</H6>
          <CardCVCElement onChange={this.handleChange} />
          <P error id="error-cardCvc" />
        </label>
        <label>
          <H6>Billing Zip</H6>
          <PostalCodeElement onChange={this.handleChange} />
          <P error id="error-postalCode" />
        </label>

        {true && <Button onClick={this.onCompleteSection}>Next</Button>}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
