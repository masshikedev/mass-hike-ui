import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import BottomNav from '../components/checkout/BottomNav';
import { getTripById } from '../actions/CurrentTripActions';
import renderByStatus from '../utils/renderByStatus';
import ContactSection from '../components/checkout/ContactSection';
import HikeInfoSection from '../components/checkout/HikeInfoSection';
import PaymentSection from '../components/checkout/PaymentSection';
import PaymentTypeSection from '../components/checkout/PaymentTypeSection';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';
import MobileCheckoutForm from '../components/checkout/MobileCheckoutForm';
import styled from 'styled-components';
import { H3, Container, GridParent, MediaQueries } from '../style';

const FORM_SEQUENCE = [
  { name: 'Contact', component: ContactSection },
  { name: 'Hike Info', component: HikeInfoSection },
  { name: 'Payment', component: PaymentTypeSection },
  { name: 'Payment', component: PaymentSection },
];

class MobileCheckout extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  renderLoading() {
    return (
      <Container>
        <H3>Loading...</H3>
      </Container>
    );
  }

  renderError() {
    return (
      <Container>
        <H3>An error has occured.</H3>
      </Container>
    );
  }

  renderSuccess = () => {
    const { currentSection } = this.props;
    const num_sections = FORM_SEQUENCE.length;
    return currentSection < num_sections
      ? this.renderSections()
      : this.renderSummary();
  };

  renderSections() {
    return (
      <div>
        <Container>
          <GridParent>
            <MobileCheckoutForm
              components={FORM_SEQUENCE.map(s => s.component)}
            />
          </GridParent>
        </Container>
        <BottomNav names={FORM_SEQUENCE.map(s => s.name)} />
      </div>
    );
  }

  renderSummary() {
    return (
      <Container>
        <GridParent>
          <form>
            <CheckoutConfirmation />
          </form>
        </GridParent>
      </Container>
    );
  }

  render() {
    const { status } = this.props;
    return (
      <div>
        {renderByStatus(
          status,
          this.renderLoading,
          this.renderSuccess,
          this.renderError
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  trip: state.currentTrip.trip,
  status: state.currentTrip.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckout);
