import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  prevCheckoutSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import CheckoutFormValidator from '../../utils/CheckoutFormValidator';
import ContactSection from './ContactSection';
import HikeInfoSection from './HikeInfoSection';
import PaymentSection from './PaymentSection';
import PaymentTypeSection from './PaymentTypeSection';
import CheckoutConfirmation from './CheckoutConfirmation';
import styled from 'styled-components';
import { MediaQueries } from '../../style';
import { injectStripe } from 'react-stripe-elements';

const FORM_SEQUENCE = [
  ContactSection,
  HikeInfoSection,
  PaymentTypeSection,
  PaymentSection,
  CheckoutConfirmation,
];

const Wrapper = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

class CheckoutForm extends Component {
  isSectionComplete(fields) {
    for (const key in fields) {
      if (!CheckoutFormValidator[key](fields[key])) {
        return false;
      }
    }
    return true;
  }

  completeSection(fields) {
    const { nextCheckoutSection, setCheckoutState } = this.props;
    setCheckoutState(fields);
    nextCheckoutSection();
  }

  render() {
    const { currentSection } = this.props;
    const FormSection = FORM_SEQUENCE[currentSection];
    return (
      <Wrapper>
        <form>
          <FormSection
            showNextButton={this.isSectionComplete}
            onClickNextButton={fields => this.completeSection(fields)}
          />
        </form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextCheckoutSection,
      prevCheckoutSection,
      setCheckoutState,
    },
    dispatch
  );

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);
