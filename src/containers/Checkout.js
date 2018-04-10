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
import styled from 'styled-components';
import { Container, GridParent, MediaQueries } from '../style';

const FormWrapper = styled.div`
  grid-column: span 8;
  max-width: 800px;
  margin: 5% 12%;
  min-width: 200px;
  height: 100%;
  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

class Checkout extends LoadableComponent {
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

  renderSuccess = () => {
    const { currentSection, trip, match, checkoutInitialized } = this.props;
    return (
      <Container>
        <div>
          <GridParent>
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
              </form>
            </FormWrapper>
            {currentSection !== 4 && <CheckoutSidebar trip={trip} />}
          </GridParent>
        </div>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  checkoutInitialized: state.checkout.initialized,
  trip: state.currentTrip.trip,
  status: state.currentTrip.status,
  checkoutTripId: state.checkout.tripId,
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
