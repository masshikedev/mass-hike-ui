import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import styled from 'styled-components';
import { Container, GridParent } from '../style';

const Divider = styled.div`
  grid-column: span 1;
  border-right: 3px solid #000;

  @media (max-width: 767px) {
    grid-column: 0;
    display: none;
  }
`;

class Checkout extends Component {
  render() {
    const tripId = this.props.match.params.id;
    const { currentSection } = this.props;
    return (
      <Container>
        <GridParent>
          <CheckoutForm tripId={tripId} />
          {currentSection !== 4 && <Divider />}
          {currentSection !== 4 && <CheckoutSidebar tripId={tripId} />}
        </GridParent>
        <CheckoutProgressBar />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
});

export default connect(mapStateToProps)(Checkout);
