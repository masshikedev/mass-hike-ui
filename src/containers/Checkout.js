import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSidebar from '../components/checkout/CheckoutSidebar';
import CheckoutProgressBar from '../components/checkout/CheckoutProgressBar';

class Checkout extends Component {
  render() {
    const tripId = this.props.match.params.id;
    const { currentSection } = this.props;
    return (
      <div style={{ paddingTop: 50 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            height: 300,
          }}
        >
          <CheckoutForm tripId={tripId} />
          {currentSection !== 3 && <CheckoutSidebar tripId={tripId} />}
        </div>
        <CheckoutProgressBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
});

export default connect(mapStateToProps)(Checkout);
