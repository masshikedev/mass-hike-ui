import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDate, getTime } from '../../utils/dateFormats';
import trips from '../../data/trips';
import P from '../../style/P';
import H6 from '../../style/H6';

const Header = H6.extend`
  font-size: 20px;
  letter-spacing: 0.9px;
`;

const Description = P.extend`
  font-size: large;
  letter-spacing: 0.6px;
  text-transform: capitalize;
`;

class CheckoutSidebar extends Component {
  render() {
    const { tripId, tickets } = this.props;
    const trip = trips[tripId];
    return (
      <div style={{ gridColumn: '9 / 12' }}>
        <Header>Trip Summary</Header>
        <Description>
          {trip.name}
          <br />
          {getDate(trip.time.hikeStart)}
          <br />
          {getTime(trip.time.hikeStart)}
          <br />
        </Description>
        {tickets !== '' && (
          <div>
            <Description>{`${tickets} tickets`}</Description>
            <Header>Total</Header>
            <Description>{`$${tickets * trip.price}`}</Description>
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
