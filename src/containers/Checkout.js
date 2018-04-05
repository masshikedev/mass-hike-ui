import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SectionOrder from '../data/CheckoutSectionOrder';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import { getTripById } from '../actions/CurrentTripActions';
import { setCheckoutState, resetCheckout } from '../actions/CheckoutActions';
import renderByStatus from '../utils/renderByStatus';
import styled from 'styled-components';
import { H3, Container, GridParent, MediaQueries } from '../style';
import { injectStripe } from 'react-stripe-elements';
import CardPayment from '../components/checkout/payments/CardPayment';

const Divider = styled.div`
  grid-column: span 1;
  border-right: 3px solid #000;

  ${MediaQueries.small} {
    grid-column: 0;
    display: none;
  }
`;

const FormWrapper = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

class Checkout extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  componentWillReceiveProps() {
    const { trip, checkoutTripId, resetCheckout, match } = this.props;
    if (trip !== null && trip.tripId !== checkoutTripId) {
      resetCheckout(match.params.tripId);
    }
  }

  completeSection = (fields, options) => {
    const { nextCheckoutSection, setCheckoutState, match } = this.props;
    const { nextSectionPath } = options;
    setCheckoutState(fields);
    nextCheckoutSection(`${match.url}/${nextSectionPath}`);
  };

  stripeCreateToken = () =>
    this.props.stripe.createToken().then(({ token }) => {
      console.log('Received Stripe token:', token);
    });

  renderDefaultSection() {
    const { match, stripe } = this.props;
    const section = SectionOrder[0];
    const next = SectionOrder[1];
    const Section = section.component;
    return (
      <Route
        exact
        path={`${match.url}/${section.path}`}
        render={() => (
          <Section
            completeSection={this.completeSection}
            index={0}
            next={next.path}
          />
        )}
      />
    );
  }

  renderRemainingSections() {
    const { match, stripe } = this.props;
    return SectionOrder.map((section, i) => {
      if (i === 0) {
        return null;
      }
      const Section = section.component;
      const next =
        i < SectionOrder.length - 1 ? SectionOrder[i + 1].path : null;
      return (
        <Route
          exact
          path={`${match.url}/${section.path}`}
          render={() => (
            <Section
              completeSection={this.completeSection}
              index={i}
              next={next}
            />
          )}
          key={i}
        />
      );
    });
  }

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess = () => {
    const {
      currentSection,
      trip,
      match,
      checkoutInitialized,
      paymentType,
    } = this.props;
    const showCardPayment = currentSection == 3 && paymentType === 'card';
    return (
      <div>
        <GridParent>
          <FormWrapper>
            <form>
              <Switch>
                {this.renderDefaultSection()}
                {!checkoutInitialized && (
                  <Redirect to={`${match.url}/${SectionOrder[0].path}`} />
                )}
                {this.renderRemainingSections()}
              </Switch>
              <CardPayment
                index={3}
                next={SectionOrder[4].path}
                completeSection={this.completeSection}
                stripeCreateToken={this.stripeCreateToken}
                hide={!showCardPayment}
              />
            </form>
          </FormWrapper>
          {currentSection !== 4 && <Divider />}
          {currentSection !== 4 && <CheckoutSidebar trip={trip} />}
        </GridParent>
        <CheckoutProgressBar sectionOrder={SectionOrder} />
      </div>
    );
  };

  render() {
    const { status } = this.props;
    return (
      <Container>
        {renderByStatus(
          status,
          this.renderLoading,
          this.renderSuccess,
          this.renderError
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  checkoutInitialized: state.checkout.initialized,
  trip: state.currentTrip.trip,
  status: state.currentTrip.status,
  checkoutTripId: state.checkout.tripId,
  paymentType: state.checkout.paymentType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
      setCheckoutState,
      resetCheckout,
      nextCheckoutSection: nextSectionUrl => push(nextSectionUrl),
    },
    dispatch
  );

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
