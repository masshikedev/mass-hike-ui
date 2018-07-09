import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { donationConstraints } from '../../utils/validationConstraints';
import { donate } from '../../actions/DonationActions';
import { P, H4, H6, Button } from '../../style';
import stripeStyle from '../../style/stripeStyle';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
import {
  Checkbox,
  CheckBoxWrapper,
  CustomPrice,
  ValidatedTextInput,
} from '../forms';
import styled from 'styled-components';

const Form = styled.div`
  margin-top: 50px;
`;

const Section = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;

  h6 {
    margin-top: 10px;
  }
`;

const DonateButton = Button.extend`
  margin-top: 10px;
`;

const SUGGESTIONS = [5, 10, 25, 50, 100];

class DonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: null,
      customPriceEdited: false,
      email: '',
      cardNumber: {},
      cardExpiry: {},
      cardCvc: {},
      postalCode: {},
    };
  }

  onClickDonate = e => {
    e.preventDefault();
    const { donate } = this.props;
    const { selectedPrice, email } = this.state;
    if (!validate(this.state, donationConstraints()) && this.paymentValid()) {
      this.stripeCreateToken(token => {
        donate({
          stripeToken: token,
          amount: selectedPrice,
          email,
        });
      });
    }
  };

  paymentValid() {
    const { cardNumber, cardExpiry, cardCvc, postalCode } = this.state;
    return (
      cardNumber['complete'] &&
      cardExpiry['complete'] &&
      cardCvc['complete'] &&
      postalCode['complete']
    );
  }

  stripeCreateToken = callback =>
    this.props.stripe.createToken().then(({ token }) => {
      callback(token);
    });

  renderPrices() {
    const { selectedPrice } = this.state;
    return SUGGESTIONS.map((p, i) => {
      return (
        <Checkbox
          key={i}
          type="radio"
          checked={selectedPrice === p}
          onChange={() => this.setState({ selectedPrice: p })}
          text={`$${p}`}
        />
      );
    });
  }

  render() {
    const {
      selectedPrice,
      customPriceEdited,
      email,
      cardNumber,
      cardExpiry,
      cardCvc,
      postalCode,
    } = this.state;
    const messages = validate(this.state, donationConstraints()) || 'valid';
    return (
      <Form>
        <H4>Select an amount to donate</H4>
        <Section>
          <CheckBoxWrapper>
            {this.renderPrices()}
            <CustomPrice
              prices={SUGGESTIONS}
              selectedPrice={selectedPrice}
              onChange={e => this.setState({ selectedPrice: e.target.value })}
              onBlur={e => this.setState({ customPriceEdited: true })}
            />
          </CheckBoxWrapper>
          {customPriceEdited &&
            messages.selectedPrice && (
              <P proxima leftmargin size="medium" color="error">
                {messages.selectedPrice[0]}
              </P>
            )}
        </Section>
        <H4>Enter your credit card information</H4>
        <Section>
          <label>
            <H6>Card Number</H6>
            <CardNumberElement
              style={stripeStyle}
              onChange={change => this.setState({ cardNumber: change })}
            />
            {cardNumber.error && (
              <P proxima leftmargin size="medium" color="error">
                {cardNumber.error.message}
              </P>
            )}
          </label>
          <label>
            <H6>Expiration</H6>
            <CardExpiryElement
              style={stripeStyle}
              onChange={change => this.setState({ cardExpiry: change })}
            />
            {cardExpiry.error && (
              <P proxima leftmargin size="medium" color="error">
                {cardExpiry.error.message}
              </P>
            )}
          </label>
          <label>
            <H6>Security Code</H6>
            <CardCVCElement
              style={stripeStyle}
              onChange={change => this.setState({ cardCvc: change })}
            />
            {cardCvc.error && (
              <P proxima leftmargin size="medium" color="error">
                {cardCvc.error.message}
              </P>
            )}
          </label>
          <label>
            <H6>Billing Zip</H6>
            <PostalCodeElement
              style={stripeStyle}
              onChange={change => this.setState({ postalCode: change })}
            />
            {postalCode.error && (
              <P proxima leftmargin size="medium" color="error">
                {postalCode.error.message}
              </P>
            )}
          </label>
        </Section>
        <H4>Enter your email address</H4>
        <Section>
          <ValidatedTextInput
            placeholder="Email Address"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            error={messages.email}
          />
        </Section>
        <DonateButton
          primary
          disabled={!(messages === 'valid' && this.paymentValid())}
          onClick={this.onClickDonate}
        >
          Donate
        </DonateButton>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ donate }, dispatch);

export default injectStripe(connect(null, mapDispatchToProps)(DonationForm));
