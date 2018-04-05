import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import { setCurrentSection } from '../../../actions/CheckoutActions';
import { H3, H6, Input, Button } from '../../../style';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';

class CardPayment extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { cardNumber, expiration, cvv, billingZip } = props;
    this.state = {
      cardNumber,
      expiration,
      cvv,
      billingZip,
      hide: false,
    };
  }

  render() {
    const { stripeCreateToken, hide } = this.props;
    const style = {
      base: {
        color: '#303238',
        fontSize: '16px',
        color: '#32325d',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    };
    return (
      <div style={hide ? { display: 'none' } : {}}>
        <H3>Enter your credit card information</H3>
        <div>
          <label>
            <H6>Card Number</H6>
            <CardNumberElement
              style={style}
              onChange={e => {
                console.log(e);
              }}
            />
          </label>
          <label>
            <H6>Expiration</H6>
            <CardExpiryElement
              style={style}
              onChange={e => {
                console.log(e);
              }}
            />
          </label>
        </div>

        <label>
          <H6>Security Code</H6>
          <CardCVCElement
            style={style}
            onChange={e => {
              console.log(e);
            }}
          />
        </label>
        <label>
          <H6>Billing Zip</H6>
          <PostalCodeElement
            style={style}
            onChange={e => {
              console.log(e);
            }}
          />
        </label>

        {true && (
          <Button
            onClick={e => {
              stripeCreateToken();
              this.onCompleteSection(e);
            }}
          >
            Next
          </Button>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
