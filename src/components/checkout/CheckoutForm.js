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
import CheckoutConfirmation from './CheckoutConfirmation';

const FORM_SEQUENCE = [
  ContactSection,
  HikeInfoSection,
  PaymentSection,
  CheckoutConfirmation,
];

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
      <div style={{ gridColumn: 'span 8' }}>
        <form>
          <FormSection
            showNextButton={this.isSectionComplete}
            onClickNextButton={fields => this.completeSection(fields)}
            tripId={tripId}
          />
        </form>
      </div>
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
