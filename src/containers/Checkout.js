import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ContactSection from '../components/checkout/ContactSection';
import HikeInfoSection from '../components/checkout/HikeInfoSection';
import PaymentSection from '../components/checkout/PaymentSection';
import PaymentTypeSection from '../components/checkout/PaymentTypeSection';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import { getTripById } from '../actions/CurrentTripActions';
import { setCheckoutState } from '../actions/CheckoutActions';
import renderByStatus from '../utils/renderByStatus';
import styled from 'styled-components';
import { H3, Container, GridParent, MediaQueries } from '../style';

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

const SECTION_ORDER = [
  { component: ContactSection, path: 'contact-info', name: 'Contact Info' },
  { component: HikeInfoSection, path: 'hike-info', name: 'Hike Info' },
  { component: PaymentTypeSection, path: 'payment-type', name: 'Payment Type' },
  { component: PaymentSection, path: 'payment', name: 'Payment' },
  {
    component: CheckoutConfirmation,
    path: 'confirmation',
    name: 'Confirmation',
  },
];

class Checkout extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  completeSection = (fields, nextSectionPath) => {
    const { nextCheckoutSection, setCheckoutState, match } = this.props;
    setCheckoutState(fields);
    nextCheckoutSection(`${match.url}/${nextSectionPath}`);
  };

  renderDefaultSection() {
    const { match } = this.props;
    const section = SECTION_ORDER[0];
    const Section = section.component;
    return (
      <Route
        exact
        path={`${match.url}/${section.path}`}
        render={() => (
          <Section
            completeSection={this.completeSection}
            index={0}
            next={section.next}
          />
        )}
      />
    );
  }

  renderRemainingSections() {
    const { match } = this.props;
    return SECTION_ORDER.map((section, i) => {
      if (i === 0) {
        return null;
      }
      const Section = section.component;
      const next =
        i < SECTION_ORDER.length - 1 ? SECTION_ORDER[i + 1].path : null;
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
    const { currentSection, trip, match, checkoutInitialized } = this.props;
    return (
      <div>
        <GridParent>
          <FormWrapper>
            <form>
              <Switch>
                {this.renderDefaultSection()}
                {!checkoutInitialized && (
                  <Redirect to={`${match.url}/${SECTION_ORDER[0].path}`} />
                )}
                {this.renderRemainingSections()}
                <Redirect to={`${match.url}/${SECTION_ORDER[0].path}`} />
              </Switch>
            </form>
          </FormWrapper>
          {currentSection !== 4 && <Divider />}
          {currentSection !== 4 && <CheckoutSidebar trip={trip} />}
        </GridParent>
        <CheckoutProgressBar sectionOrder={SECTION_ORDER} baseUrl={match.url} />
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
      setCheckoutState,
      nextCheckoutSection: nextSectionUrl => push(nextSectionUrl),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
