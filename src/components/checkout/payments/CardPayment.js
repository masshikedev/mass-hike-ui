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
    const { stripeCreateToken } = this.props;
    const { hide } = this.state;
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
      <div>
        <H3>Enter your credit card information</H3>
        <label style={hide ? { position: 'absolute', top: '80px' } : {}}>
          <H6>Card Number</H6>
          <CardNumberElement
            value={this.state.cardNumber}
            style={style}
            onChange={e => {
              console.log(e);
            }}
          />
        </label>
        <label style={hide ? { position: 'absolute', top: '80px' } : {}}>
          <H6>Expiration</H6>
          <CardExpiryElement
            value={this.state.expiration}
            style={style}
            onChange={e => {
              console.log(e);
            }}
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

        {true && (
          <Button
            onClick={e => {
              //this.onCompleteSection(e);
              this.setState({ hide: true });
              stripeCreateToken();
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
