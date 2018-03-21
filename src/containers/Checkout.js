import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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

class Checkout extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  completeSection = (fields, nextSectionPath) => {
    const {
      nextCheckoutSection,
      setCheckoutState,
      match,
      dispatch,
    } = this.props;
    setCheckoutState(fields);
    nextCheckoutSection(`${match.url}/${nextSectionPath}`);
  };

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess = () => {
    const { currentSection, trip, match } = this.props;
    console.log(match);
    return (
      <div>
        <GridParent>
          <FormWrapper>
            <form>
              <Route
                exact
                path={`${match.url}/contact-info`}
                render={() => (
                  <ContactSection completeSection={this.completeSection} />
                )}
              />
              <Route
                exact
                path={`${match.url}/hike-info`}
                render={() => (
                  <HikeInfoSection completeSection={this.completeSection} />
                )}
              />
              <Route
                exact
                path={`${match.url}/payment-type`}
                render={() => (
                  <PaymentTypeSection completeSection={this.completeSection} />
                )}
              />
              <Route
                exact
                path={`${match.url}/payment`}
                render={() => (
                  <PaymentSection completeSection={this.completeSection} />
                )}
              />
              <Route
                exact
                path={`${match.url}/confirmation`}
                component={CheckoutConfirmation}
              />
            </form>
          </FormWrapper>
          {currentSection !== 4 && <Divider />}
          {currentSection !== 4 && <CheckoutSidebar trip={trip} />}
        </GridParent>
        <CheckoutProgressBar />
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
