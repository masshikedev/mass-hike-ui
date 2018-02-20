import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDate, getTime } from '../../utils/dateFormats';
import trips from '../../data/trips';
import { P, H6 } from '../../style';

class CheckoutSidebar extends Component {
  render() {
    const { tripId, tickets } = this.props;
    const trip = trips[tripId];
    return (
      <div style={{ gridColumn: '9 / 12' }}>
        <H6>Trip Summary</H6>
        <P large capitalize>
          {trip.name}
          <br />
          {getDate(trip.time.hikeStart)}
          <br />
          {getTime(trip.time.hikeStart)}
          <br />
        </P>
        {tickets !== '' && (
          <div>
            <P large capitalize>{`${tickets} tickets`}</P>
            <H6>Total</H6>
            <P large capitalize>{`$${tickets * trip.price}`}</P>
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
