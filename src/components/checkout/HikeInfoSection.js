import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import trips from '../../data/trips';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation, showMoreZips } = props;
    this.state = {
      tickets,
      pickupLocation,
      showMoreZips: false,
    };
  }

  toggleShowMore(e) {
    e.preventDefault();
    this.setState({ showMoreZips: !this.state.showMoreZips });
  }

  renderTicketOptions(trip) {
    let options = [
      <option value="" key={0}>
        -- Select --
      </option>,
    ];
    for (let i = 1; i <= trip.capacity - trip.ticketsSold; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return (
      <select
        value={this.state.tickets}
        onChange={e => this.setState({ tickets: e.target.value })}
      >
        {options}
      </select>
    );
  }

  renderZipcodeOptions(trip, max) {
    let zips = [];
    for (let i = 0; i < trip.pickupZipcodes.length && i < max; i++) {
      let zc = trip.pickupZipcodes[i];
      zips.push(
        <label htmlFor={zc.zip} key={i}>
          <input
            type="radio"
            id={zc.zip}
            checked={this.state.pickupLocation === zc.zip}
            onChange={e => this.setState({ pickupLocation: zc.zip })}
          />
          {'  '}
          {zc.zip}
          <P small>{zc.desc}</P>
        </label>
      );
    }
    return zips;
  }

  render() {
    const { showNextButton, onClickNextButton, tripId } = this.props;
    const trip = trips[tripId];
    const zipLength = this.state.pickupLocation.length;
    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        {this.renderTicketOptions(trip)}
        <H3>In what zipcode would you liked to be picked up?</H3>
        <P small>
          Your final pickup location will be sent to you a week before your hike
        </P>
        <Input
          type="text"
          value={this.state.pickupLocation}
          onChange={e => this.setState({ pickupLocation: e.target.value })}
        />
        <br />
        {zipLength > 0 && zipLength < 5 ? (
          <P small>
            Pickup for this trip is not available in this zipcode. Please choose
            a zipcode within Mass Hike’s pickup radius, where pickup will be
            available in an area accessible by public transporation.
          </P>
        ) : null}
        <H6>Nearby Areas</H6>
        {this.renderZipcodeOptions(
          trip,
          this.state.showMoreZips ? trip.pickupZipcodes.length : 3
        )}
        <br />
        <Button onClick={e => this.toggleShowMore(e)}>
          {this.state.showMoreZips ? 'Show Less' : 'Show More'}
        </Button>
        {showNextButton(this.state) && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  pickupLocation: state.checkout.pickupLocation,
});

export default connect(mapStateToProps)(HikeInfoSection);
