/* eslint-disable no-undef */
import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { P, H6 } from '../../style';
import styled from 'styled-components';

const Footer = styled.div`
  text-align: right;
  padding: 5px;
`;

const FooterImg = styled.img`
  width: 30%;
  height: auto;
`;

let map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: -33.866, lng: 151.196 },
  zoom: 15,
});
let service = new google.maps.places.PlacesService(map);

class PlaceAutocomplete extends Component {
  inputProps = {
    onBlur: () => {
      this.setState({ editing: false });
    },
    type: 'search',
    placeholder: 'Search Places...',
  };

  styles = bad => {
    return {
      input: {
        boxSizing: 'border-box',
        fontSize: '20px',
        padding: '5px',
        width: '100%',
        maxWidth: '500px',
        border: bad ? '3px solid red' : '3px solid black',
      },
    };
  };
  options = {
    types: ['address'],
    location: new google.maps.LatLng(42.3601, -71.0571),
    radius: 60000,
  };

  constructor(props) {
    super(props);
    this.state = { editing: true };
  }

  renderSuggestion = ({ suggestion }) => {
    return <H6>{suggestion}</H6>;
  };

  renderFooter = () => (
    <Footer>
      <FooterImg src={require('../../images/google-logo.png')} />
    </Footer>
  );

  onError = (status, clearSuggestions) => {
    clearSuggestions();
  };

  render() {
    const { value, onChange, callback, error } = this.props;
    const { editing } = this.state;
    return (
      <div>
        <PlacesAutocomplete
          inputProps={{ value, onChange, ...this.inputProps }}
          options={this.options}
          styles={this.styles(!editing && error)}
          renderSuggestion={this.renderSuggestion}
          renderFooter={this.renderFooter}
          onError={this.onError}
          onSelect={(address, pid) => {
            onChange(address);
            service.getDetails(
              {
                placeId: pid,
              },
              (place, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  callback(place);
                }
              }
            );
          }}
        />
        {!editing && error ? (
          <P small error>
            {error[0]}
          </P>
        ) : null}
      </div>
    );
  }
}

export default PlaceAutocomplete;
