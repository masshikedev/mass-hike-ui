import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDate, getTime } from '../../utils/dateFormats';
import trips from '../../data/trips';

class CheckoutSidebar extends Component {
  render() {
    const { tripId, tickets } = this.props;
    const trip = trips[tripId];
    return (
      <div style={{ gridColumn: 'span 4' }}>
        <h6>Trip Summary</h6>
        <p>
          {trip.name}
          <br />
          {getDate(trip.time.hikeStart)}
          <br />
          {getTime(trip.time.hikeStart)}
          <br />
        </p>
        {tickets !== '' && (
          <div>
            <p>{`${tickets} tickets`}</p>
            <h6>Total</h6>
            <p>{`$${tickets * trip.price}`}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
});

export default connect(mapStateToProps)(CheckoutSidebar);
