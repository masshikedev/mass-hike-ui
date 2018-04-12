import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../../actions/CheckoutActions';
import { P, H3, H6, Input, Button, constants } from '../../../style';
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
    const { cardNumber, cardExpiry, cardCvc, postalCode } = this.state;
    const style = {
      base: {
        color: 'black',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: constants.red,
        ':focus': {
          color: 'black',
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
            {cardNumber.error && <P error>{cardNumber.error.message}</P>}
          </label>
          <label>
            <H6>Expiration</H6>
            <CardExpiryElement
              style={style}
              onChange={e => this.fieldChange(e)}
            />
            {cardExpiry.error && <P error>{cardExpiry.error.message}</P>}
          </label>
        </div>

        <label>
          <H6>Security Code</H6>
          <CardCVCElement style={style} onChange={e => this.fieldChange(e)} />
          {cardCvc.error && <P error>{cardCvc.error.message}</P>}
        </label>
        <label>
          <H6>Billing Zip</H6>
          <PostalCodeElement
            style={style}
            onChange={e => this.fieldChange(e)}
          />
          {postalCode.error && <P error>{postalCode.error.message}</P>}
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
