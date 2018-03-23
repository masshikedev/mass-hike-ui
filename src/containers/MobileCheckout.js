import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getTripById } from '../actions/CurrentTripActions';
import renderByStatus from '../utils/renderByStatus';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';
import MobileCheckoutForm from '../components/checkout/MobileCheckoutForm';
import { H3, Container, GridParent } from '../style';
import { setCheckoutState, resetCheckout } from '../actions/CheckoutActions';

class MobileCheckout extends Component {
  componentWillMount() {
    const { getTripById, match } = this.props;
    getTripById(match.params.tripId);
  }

  componentWillReceiveProps() {
    const { trip, checkoutTripId, resetCheckout, match } = this.props;
    if (trip !== null && trip.tripId !== checkoutTripId) {
      resetCheckout(match.params.tripId, match.url);
    }
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
