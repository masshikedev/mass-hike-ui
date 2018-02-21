import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
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
    const { currentSection, tripId } = this.props;
    const FormSection = FORM_SEQUENCE[currentSection];
    return (
      <Wrapper>
        <form>
          <FormSection
            showNextButton={this.isSectionComplete}
            onClickNextButton={fields => this.completeSection(fields)}
            tripId={tripId}
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
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
