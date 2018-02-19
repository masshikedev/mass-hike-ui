import React, { Component } from 'react';
import { connect } from 'react-redux';
import trips from '../../data/trips';
import { format } from 'date-fns';
import dateFormats from '../../data/dateFormats';

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
          {format(trip.time.hikeStart, dateFormats.MONTH_DATE_YEAR)}
          <br />
          {format(trip.time.hikeStart, dateFormats.TIME)}
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
