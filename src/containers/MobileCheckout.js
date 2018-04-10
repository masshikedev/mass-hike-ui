import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getTripById } from '../actions/CurrentTripActions';
import LoadableComponent from '../components/LoadableComponent';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';
import MobileCheckoutForm from '../components/checkout/MobileCheckoutForm';
import { H3, Container, GridParent } from '../style';
import { setCheckoutState, resetCheckout } from '../actions/CheckoutActions';

class MobileCheckout extends LoadableComponent {
  componentWillMount() {
    const { getTripById, match } = this.props;
    getTripById(match.params.tripId);
  }

  componentWillReceiveProps() {
    const { trip, checkoutTripId, resetCheckout, match } = this.props;
    if (trip !== null && trip.tripId !== checkoutTripId) {
      resetCheckout(match.params.tripId);
    }
  }

  renderSuccess = () => {
    const { checkoutInitialized, match } = this.props;
    return (
      <Switch>
        <Route exact path={match.url} component={MobileCheckoutForm} />
        {!checkoutInitialized && <Redirect to={`${match.url}`} />}
        <Route
          exact
          path={`${match.url}/confirmation`}
          render={() => (
            <Container>
              <GridParent>
                <CheckoutConfirmation mobile />
              </GridParent>
            </Container>
          )}
        />
      </Switch>
    );
  };
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  trip: state.currentTrip.trip,
  status: state.currentTrip.status,
  checkoutInitialized: state.checkout.initialized,
  checkoutTripId: state.checkout.tripId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
      resetCheckout,
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckout);
