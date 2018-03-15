import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';

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
    const messages = validate(this.state, hikeConstraints(trip)) || 'valid';
    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        <P small>{trip.capacity - trip.ticketsSold} available</P>
        <ValidatedTextInput
          title=""
          value={this.state.tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
          error={messages['tickets']}
        />

        <H3>In what zipcode would you liked to be picked up?</H3>
        <P small>
          Your final pickup location will be sent to you a week before your hike
        </P>
        <ValidatedTextInput
          title=""
          value={this.state.pickupLocation}
          onChange={e => this.setState({ pickupLocation: e.target.value })}
          error={messages['pickupLocation']}
        />
        <br />
        {messages['pickupLocation'] &&
        this.state.pickupLocation.length === 5 ? (
          <div>
            <H6>Nearby Areas</H6>
            {this.renderZipcodeOptions()}
            <br />
            <Button onClick={e => this.toggleShowMore(e)}>
              {this.state.showMoreZips ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        ) : null}

        {messages === 'valid' && (
          <Button onClick={e => onClickNextButton(this.state, e)}>Next</Button>
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
