import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
    const { currentSection, match } = this.props;
    const FormSection = FORM_SEQUENCE[currentSection];
    const childProps = {
      showNextButton: this.isSectionComplete,
      onClickNextButton: fields => this.completeSection(fields),
    };
    return (
      <Wrapper>
        <form>
          <Route
            exact
            path={`${match.url}/contact-info`}
            render={() => <ContactSection {...childProps} />}
          />
          <Route
            exact
            path={`${match.url}/hike-info`}
            render={() => <HikeInfoSection {...childProps} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
