import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import { getTripById } from '../actions/CurrentTripActions';
import styled from 'styled-components';
import { Container, GridParent, MediaQueries } from '../style';
import RequestStatus from '../RequestStatus';

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
    getTripById(this.props.match.params.id);
  }

  render() {
    const { currentSection, trip, status } = this.props;
    if (status !== RequestStatus.SUCCESS) {
      return null;
    }
    return (
      <Container>
        <GridParent>
          <CheckoutForm tripId={trip.tripId} />
          {currentSection !== 4 && <Divider />}
          {currentSection !== 4 && <CheckoutSidebar tripId={trip.tripId} />}
        </GridParent>
        <CheckoutProgressBar />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  tripId: state.currentTrip.trip,
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
