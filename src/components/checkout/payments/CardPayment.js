import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../../actions/CheckoutActions';
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
    const { cardNumber, cardExpiry, cardCvc, postalCode } = props;
    this.state = {
      cardNumber,
      cardExpiry,
      cardCvc,
      postalCode,
    };
  }

  fieldChange(change) {
    const { fields } = this.state;
    const { setCheckoutState } = this.props;
    const element = change['elementType'];
    this.setState({ [element]: change });
    setCheckoutState(this.state);
  }

  allValid() {
    const { cardNumber, cardExpiry, cardCvc, postalCode } = this.state;
    return (
      cardNumber['complete'] &&
      cardExpiry['complete'] &&
      cardCvc['complete'] &&
      postalCode['complete']
    );
  }

  render() {
    const { stripeCreateToken, show } = this.props;
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
      <div style={show ? {} : { display: 'none' }}>
        <H3>Enter your credit card information</H3>
        <div>
          <label>
            <H6>Card Number</H6>
            <CardNumberElement
              style={style}
              onChange={e => this.fieldChange(e)}
            />
          </label>
          <label>
            <H6>Expiration</H6>
            <CardExpiryElement
              style={style}
              onChange={e => this.fieldChange(e)}
            />
          </label>
        </div>

        <label>
          <H6>Security Code</H6>
          <CardCVCElement style={style} onChange={e => this.fieldChange(e)} />
        </label>
        <label>
          <H6>Billing Zip</H6>
          <PostalCodeElement
            style={style}
            onChange={e => this.fieldChange(e)}
          />
        </label>

        {this.allValid() && (
          <Button onClick={this.onCompleteSection}>Next</Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cardNumber: state.checkout.cardNumber,
  cardExpiry: state.checkout.cardExpiry,
  cardCvc: state.checkout.cardCvc,
  postalCode: state.checkout.postalCode,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
