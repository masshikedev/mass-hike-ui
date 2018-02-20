import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 50;
`;

const CheckoutArea = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 300;
`;

class Checkout extends Component {
  render() {
    const tripId = this.props.match.params.id;
    const { currentSection } = this.props;
    return (
      <Wrapper>
        <CheckoutArea>
          <CheckoutForm tripId={tripId} />
          {currentSection !== 3 && <CheckoutSidebar tripId={tripId} />}
        </CheckoutArea>
        <CheckoutProgressBar />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
});

export default connect(mapStateToProps)(Checkout);
