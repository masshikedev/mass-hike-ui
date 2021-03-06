import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import { P, H2, H6 } from '../../style';
import { validate } from 'validate.js';
import { paymentTypeConstraints } from '../../utils/validationConstraints';
import getCurrentPricing from '../../utils/getCurrentPricing';
import cashPaymentAvailable from '../../utils/cashPaymentAvailable';
import {
  Checkbox,
  ValidatedTextInput,
  CustomPrice,
  NextButton,
  BackButton,
  ButtonSpacer,
  CheckBoxWrapper,
} from '../forms';

const Caption = P.extend`
  max-width: 500px;
`;

class PaymentTypeSection extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { promoCode, paymentType, selectedPrice } = props;
    this.state = {
      promoCode,
      paymentType,
      selectedPrice,
      customPriceEditted: false,
    };
  }

  currentPricing() {
    return getCurrentPricing(this.state.promoCode, this.props.trip);
  }

  pricingSuggestions() {
    const { suggestion1, suggestion2, suggestion3 } = this.currentPricing();
    return [suggestion1, suggestion2, suggestion3];
  }

  renderPrices() {
    const { selectedPrice } = this.state;
    return this.pricingSuggestions().map((p, i) => {
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

  messages() {
    const { trip } = this.props;
    return (
      validate(
        this.state,
        paymentTypeConstraints(trip, this.currentPricing())
      ) || 'valid'
    );
  }

  render() {
    const { trip, availableTimes } = this.props;
    const { paymentType, selectedPrice } = this.state;
    const pricing = this.currentPricing();
    const showCashPayment = cashPaymentAvailable(
      availableTimes,
      trip.time.pickupStart
    );
    const messages = this.messages();
    return (
      <div>
        <H2>Payment Options</H2>
        <H6>Enter a promo code (optional)</H6>
        <ValidatedTextInput
          title=""
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
          error={messages['promoCode']}
          medium
        />
        <H6>Choose your ticket price</H6>
        <Caption size="medium" proxima>
          {`Each ticket costs $${
            pricing.min
          }, any amount over that is a donation to Mass Hike. Please choose a price between $${
            pricing.min
          } and $${pricing.max}.`}
        </Caption>
        <CheckBoxWrapper>
          {this.renderPrices()}
          <CustomPrice
            prices={this.pricingSuggestions()}
            selectedPrice={selectedPrice}
            onChange={e => this.setState({ selectedPrice: e.target.value })}
            onBlur={e => this.setState({ customPriceEditted: true })}
            error={messages['selectedPrice'] ? true : false}
          />
        </CheckBoxWrapper>
        {this.state.customPriceEditted && (
          <P proxima leftmargin size="medium" color="error">
            {messages['selectedPrice']}
          </P>
        )}
        <H6>How would you like to pay?</H6>
        <CheckBoxWrapper>
          <Checkbox
            type="radio"
            checked={paymentType === 'card'}
            onChange={() => this.setState({ paymentType: 'card' })}
            text="Credit/Debit"
          />
          {showCashPayment && (
            <Checkbox
              type="radio"
              checked={paymentType !== 'card'}
              onChange={() => this.setState({ paymentType: 'cash' })}
              text="Cash"
            />
          )}
        </CheckBoxWrapper>
        {!showCashPayment && (
          <P proxima size="small">
            Cash payment is not available for this trip.
          </P>
        )}
        <ButtonSpacer>
          <BackButton
            onClick={e => this.onBackSection(e, messages === 'valid')}
            active={true}
          />
          <NextButton
            onClick={this.onCompleteSection}
            active={messages === 'valid'}
            hideOnMobile={!this.onFurthestSection()}
          />
        </ButtonSpacer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  promoCode: state.checkout.promoCode,
  selectedPrice: state.checkout.selectedPrice,
  trip: state.currentTrip.trip,
  availableTimes: state.availability.times,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTypeSection);
