import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
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

  validZipcode() {
    const { trip } = this.props;
    const zipList = trip.pickupZipcodes.map(el => el.zip);
    return zipList.includes(this.state.pickupLocation);
  }

  validTixNumber() {
    const { trip } = this.props;
    const available = trip.capacity - trip.ticketsSold;
    return 0 < this.state.tickets && this.state.tickets <= available;
  }

  renderZipcodeOptions() {
    const { trip } = this.props;
    const { showMoreZips } = this.state;
    const max = showMoreZips ? trip.pickupZipcodes.length : 3;
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
    const { showNextButton, onClickNextButton, trip } = this.props;
    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        <P small>{trip.capacity - trip.ticketsSold} available</P>
        <Input
          type="text"
          value={this.state.tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
        />

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
        {!this.validZipcode() && this.state.pickupLocation.length === 5 ? (
          <div>
            <P small>
              Pickup for this trip is not available in this zipcode. Please
              choose a zipcode within Mass Hike’s pickup radius, where pickup
              will be available in an area accessible by public transporation.
            </P>
            <H6>Nearby Areas</H6>
            {this.renderZipcodeOptions()}
            <br />
            <Button onClick={e => this.toggleShowMore(e)}>
              {this.state.showMoreZips ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        ) : null}

        {this.validTixNumber() &&
          this.validZipcode() && (
            <Button onClick={e => onClickNextButton(this.state, e)}>
              Next
            </Button>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  pickupLocation: state.checkout.pickupLocation,
  trip: state.currentTrip.trip,
});

export default connect(mapStateToProps)(HikeInfoSection);
