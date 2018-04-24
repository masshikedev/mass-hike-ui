import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import ReactPlacesAutocomplete from 'react-places-autocomplete';
import { P, H6 } from '../../style';
import styled from 'styled-components';
import { GOOGLE_MAPS_API_KEY } from '../../constants';

const Wrapper = styled.div`
  max-width: 500px;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  text-align: right;
  padding: 5px;
`;

const FooterImg = styled.img`
  width: 30%;
  height: auto;
`;

class PlaceAutocomplete extends Component {
  constructor(props) {
    super(props);
    const { google } = props;
    this.state = { editing: true, service: this.getService(google) };
  }

  onError = (status, clearSuggestions) => {
    clearSuggestions();
  };

  styles(bad) {
    return {
      input: {
        boxSizing: 'border-box',
        fontSize: '20px',
        padding: '5px',
        width: '100%',
        border: bad ? '2px solid red' : '2px solid black',
        borderRadius: '4px',
      },
    };
  }

  inputProps = {
    onBlur: () => {
      this.setState({ editing: false });
    },
    type: 'search',
    placeholder: 'Search Places...',
  };

  getOptions() {
    const { google } = this.props;
    return {
      types: ['address'],
      location: new google.maps.LatLng(42.3601, -71.0571),
      radius: 60000,
    };
  }

  getService(google) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });
    return new google.maps.places.PlacesService(map);
  }

  renderSuggestion = ({ suggestion }) => {
    return <H6>{suggestion}</H6>;
  };

  renderFooter = () => (
    <Footer>
      <FooterImg src={require('../../images/google-logo.png')} />
    </Footer>
  );

  render() {
    const { value, onChange, callback, error, google } = this.props;
    const { editing, service } = this.state;
    return (
      <Wrapper>
        <ReactPlacesAutocomplete
          inputProps={{ value, onChange, ...this.inputProps }}
          options={this.getOptions()}
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
          <P proxima size="medium" color="error" leftmargin>
            {error[0]}
          </P>
        ) : null}
      </Wrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(PlaceAutocomplete);
