import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../../actions/CheckoutActions';
import { P, H2, H6 } from '../../../style';
import stripeStyle from '../../../style/stripeStyle';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
import { NextButton, BackButton, ButtonSpacer } from '../../forms';

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
    const { show } = this.props;
    const { cardNumber, cardExpiry, cardCvc, postalCode } = this.state;
    return (
      <div style={show ? {} : { display: 'none' }}>
        <H2>Payment Info</H2>

        <label>
          <H6>Card Number</H6>
          <CardNumberElement
            style={stripeStyle}
            onChange={e => this.fieldChange(e)}
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
            onChange={e => this.fieldChange(e)}
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
            onChange={e => this.fieldChange(e)}
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
            onChange={e => this.fieldChange(e)}
          />
          {postalCode.error && (
            <P proxima leftmargin size="medium" color="error">
              {postalCode.error.message}
            </P>
          )}
        </label>

        <ButtonSpacer>
          <BackButton
            onClick={e => this.onBackSection(e, this.allValid())}
            active={true}
          />
          <NextButton
            onClick={this.onCompleteSection}
            active={this.allValid()}
            hideOnMobile={!this.onFurthestSection()}
          />
        </ButtonSpacer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cardNumber: state.checkout.cardNumber,
  cardExpiry: state.checkout.cardExpiry,
  cardCvc: state.checkout.cardCvc,
  postalCode: state.checkout.postalCode,
  highestCompletedSection: state.checkout.highestCompletedSection,
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
