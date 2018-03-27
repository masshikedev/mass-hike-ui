<<<<<<< HEAD
import React from 'react';
=======
/* eslint-disable no-undef */
import React, { Component } from 'react';
>>>>>>> api setup
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import { setCurrentSection } from '../../actions/CheckoutActions';
import { P, H3, Button } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';
import PlacesAutocomplete from 'react-places-autocomplete';

let map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: -33.866, lng: 151.196 },
  zoom: 15,
});
let service = new google.maps.places.PlacesService(map);

class HikeInfoSection extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
    this.state = {
      tickets,
      pickupLocation,
    };
  }

  render() {
<<<<<<< HEAD
    const { trip } = this.props;
=======
    const { showNextButton, onClickNextButton, trip } = this.props;
    const { tickets, pickupLocation } = this.state;
>>>>>>> api setup
    const messages = validate(this.state, hikeConstraints(trip)) || 'valid';

    const inputProps = {
      value: pickupLocation, // `value` is required
      onChange: address => this.setState({ pickupLocation: address }), // `onChange` is required
      onBlur: () => {
        console.log('blur!');
      },
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true,
    };
    const styles = {
      input: {
        boxSizing: 'border-box',
        fontSize: '20px',
        padding: '5px',
        width: '100%',
        maxWidth: '500px',
        border: '3px solid black',
      },
    };
    const options = {
      types: ['address'],
      location: new google.maps.LatLng(42.3601, -71.0571),
      radius: 322000,
    };
    const renderSuggestion = ({ suggestion }) => {
      return <div>{suggestion}</div>;
    };
    const renderFooter = () => (
      <div className="dropdown-footer">
        <div>
          <img src={require('../../images/google-logo.png')} />
        </div>
      </div>
    );
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

        <PlacesAutocomplete
          inputProps={inputProps}
          options={options}
          styles={styles}
          renderSuggestion={renderSuggestion}
          renderFooter={renderFooter}
          onSelect={(address, pid) => {
            this.setState({ pickupLocation: address });
            service.getDetails(
              {
                placeId: pid,
              },
              (place, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  console.log(place);
                }
              }
            );
            console.log(address, pid);
          }}
        />
        <P small error>
          {messages['pickupLocation']}
        </P>

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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HikeInfoSection);
