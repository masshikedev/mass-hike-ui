import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';
import PlaceAutocomplete from '../forms/PlaceAutocomplete';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
    this.state = {
      tickets,
      pickupLocation,
    };
  }

  setZipCodeFromPlace(place) {
    const add_comp = place.address_components;
    for (let comp of add_comp) {
      if (comp.types.includes('postal_code')) {
        const zipCode = comp.short_name;
        this.setState({ zipCode });
        return;
      }
    }
    this.setState({ zipCode: '' });
  }

  render() {
    const { showNextButton, onClickNextButton, trip } = this.props;
    const { tickets, pickupLocation } = this.state;
    const messages = validate(this.state, hikeConstraints(trip)) || 'valid';

    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        <P small>{trip.capacity - trip.ticketsSold} available</P>
        <ValidatedTextInput
          title=""
          value={tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
          error={messages['tickets']}
        />
        <H3>What is your prefered address for pickup?</H3>
        <P small>
          Your final pickup location will be within 15 minutes of this address
          and will be sent to you before your hike.
        </P>

        <PlaceAutocomplete
          value={pickupLocation} // `value` is required
          onChange={address => this.setState({ pickupLocation: address })} // `onChange` is required/>
          callback={place => this.setZipCodeFromPlace(place)}
          error={messages['zipCode']}
        />

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
  zipCode: state.checkout.zipCode,
  trip: state.currentTrip.trip,
});

export default connect(mapStateToProps)(HikeInfoSection);
