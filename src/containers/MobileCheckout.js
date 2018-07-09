import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getTripById } from '../actions/CurrentTripActions';
import LoadableComponent from '../components/LoadableComponent';
import MobileCheckoutForm from '../components/checkout/MobileCheckoutForm';
import { setCheckoutState, resetCheckout } from '../actions/CheckoutActions';
import { getAvailability } from '../actions/AvailabilityActions';

class MobileCheckout extends LoadableComponent {
  componentWillMount() {
    const { getTripById, match, getAvailability } = this.props;
    getTripById(match.params.tripId);
    getAvailability();
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
      getAvailability,
      resetCheckout,
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckout);
