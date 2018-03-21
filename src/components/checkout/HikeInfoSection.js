import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';

const NEXT_SECTION_PATH = 'payment-type';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
    this.state = {
      tickets,
      pickupLocation,
    };
  }

  onCompleteSection = e => {
    const { completeSection } = this.props;
    completeSection(this.state, NEXT_SECTION_PATH);
    e.preventDefault;
  };

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

        <H3>What is your prefered address for pickup?</H3>
        <P small>
          Your final pickup location will be within 15 minutes of this address
          and will be sent to you before your hike.
        </P>
        <ValidatedTextInput
          title=""
          value={this.state.pickupLocation}
          onChange={e => this.setState({ pickupLocation: e.target.value })}
          error={messages['pickupLocation']}
        />

        {messages === 'valid' && (
          <Button onClick={this.onCompleteSection}>Next</Button>
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
