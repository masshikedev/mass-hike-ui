import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import { getTripById } from '../actions/CurrentTripActions';
import renderByStatus from '../utils/renderByStatus';
import styled from 'styled-components';
import { H3, Container, GridParent, MediaQueries } from '../style';
import { StripeProvider, Elements } from 'react-stripe-elements';

const Divider = styled.div`
  grid-column: span 1;
  border-right: 3px solid #000;

  ${MediaQueries.small} {
    grid-column: 0;
    display: none;
  }
`;

class Checkout extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess = () => {
    const { currentSection, trip } = this.props;
    return (
      <div>
        <GridParent>
          <Elements>
            <CheckoutForm />
          </Elements>
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
      <StripeProvider apiKey="pk_test_gdoocVed0AjapcCEvNtTQqt5">
        <Container>
          {renderByStatus(
            status,
            this.renderLoading,
            this.renderSuccess,
            this.renderError
          )}
        </Container>
      </StripeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
