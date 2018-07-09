import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SectionOrder from '../data/CheckoutSectionOrder';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import LoadableComponent from '../components/LoadableComponent';
import { getTripById } from '../actions/CurrentTripActions';
import { setCheckoutState, resetCheckout } from '../actions/CheckoutActions';
import { getAvailability } from '../actions/AvailabilityActions';
import styled from 'styled-components';
import { GridParent, MediaQueries } from '../style';
import { injectStripe } from 'react-stripe-elements';
import CardPayment from '../components/checkout/payments/CardPayment';
import combineStatus from '../utils/combineStatus';

const FormWrapper = styled.div`
  grid-column: span 8;
  max-width: 800px;
  margin: 5% 12%;
  min-width: 200px;
  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const ModifiedGridParent = GridParent.extend`
  height: ${window.innerHeight - 75}px;
`;

class Checkout extends LoadableComponent {
  constructor(props) {
    super(props);
    this.state = { initialized: false };
  }

  componentWillMount() {
    const { getAvailability, getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
    getAvailability();
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
    if (options.save !== false) setCheckoutState(fields);
    nextCheckoutSection(`${match.url}/${nextSectionPath}`);
  };

  stripeCreateToken = callback =>
    this.props.stripe.createToken().then(({ token }) => {
      callback(token);
    });

  renderDefaultSection() {
    const { match } = this.props;
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
            stripeCreateToken={this.stripeCreateToken}
          />
        )}
      />
    );
  }

  renderRemainingSections() {
    const { match } = this.props;
    return SectionOrder.map((section, i) => {
      if (i === 0) {
        return null;
      }
      const Section = section.component;
      const next =
        i < SectionOrder.length - 1 ? SectionOrder[i + 1].path : null;
      const prev = SectionOrder[i - 1].path;
      return (
        <Route
          exact
          path={`${match.url}/${section.path}`}
          render={() => (
            <Section
              completeSection={this.completeSection}
              index={i}
              next={next}
              prev={prev}
              stripeCreateToken={this.stripeCreateToken}
            />
          )}
          key={i}
        />
      );
    });
  }

  renderSuccess = () => {
    const {
      currentSection,
      trip,
      match,
      checkoutInitialized,
      paymentType,
    } = this.props;
    const showCardPayment = currentSection === 3 && paymentType === 'card';
    return (
      <div>
        {trip.capacity === trip.ticketsSold && (
          <Redirect to={`/trips/${trip.tripId}`} />
        )}
        <ModifiedGridParent>
          <FormWrapper>
            <CheckoutProgressBar sectionOrder={SectionOrder} />
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
                prev={SectionOrder[2].path}
                completeSection={this.completeSection}
                show={showCardPayment}
              />
            </form>
          </FormWrapper>
          {currentSection !== 4 && <CheckoutSidebar trip={trip} />}
        </ModifiedGridParent>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  checkoutInitialized: state.checkout.initialized,
  trip: state.currentTrip.trip,
  status: combineStatus(state.currentTrip.status, state.availability.status),
  checkoutTripId: state.checkout.tripId,
  paymentType: state.checkout.paymentType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
      getAvailability,
      setCheckoutState,
      resetCheckout,
      nextCheckoutSection: nextSectionUrl => push(nextSectionUrl),
    },
    dispatch
  );

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
