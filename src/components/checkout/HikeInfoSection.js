import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { P, H2, H3, H6, Button } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';
import PlaceAutocomplete from '../forms/PlaceAutocomplete';

const Caption = P.extend`
  max-width: 500px;
`;

class HikeInfoSection extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation, zipCode } = props;
    this.state = {
      tickets,
      pickupLocation,
      zipCode,
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
        <H2>Hike Information</H2>
        <H6>How many tickets would you like to purchase?</H6>
        <P size="medium" proxima>
          {trip.capacity - trip.ticketsSold} available
        </P>
        <ValidatedTextInput
          title=""
          value={tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
          error={messages['tickets']}
        />
        <H6>What is your prefered address for pickup?</H6>
        <Caption size="medium" proxima>
          Your final pickup location will be within 15 minutes of this address
          and will be sent to you before your hike.
        </Caption>

        <PlaceAutocomplete
          value={pickupLocation}
          onChange={address =>
            this.setState({ pickupLocation: address, zipCode: '' })
          }
          callback={place => this.setZipCodeFromPlace(place)}
          error={messages['zipCode']}
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
  zipCode: state.checkout.zipCode,
  trip: state.currentTrip.trip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HikeInfoSection);
