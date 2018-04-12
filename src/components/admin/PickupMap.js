import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from 'styled-components';
import { GOOGLE_MAPS_API_KEY } from '../../constants';

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const ZOOM = 13;
const INITIAL_CENTER = {
  lat: 42.3493142,
  lng: -71.0676855,
};

class PickupMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupCoordinates: [],
    };
  }

  componentWillMount() {
    this.setCordinates();
  }

  setCordinates() {
    const { google, orders } = this.props;
    const geocoder = new google.maps.Geocoder();
    const coordinates = [];
    const pickupCoordinates = orders.map(order => {
      geocoder.geocode({ address: order.pickupLocation }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          coordinates.push({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
        if (coordinates.length === orders.length) {
          this.setState({ pickupCoordinates: coordinates });
        }
      });
    });
  }

  renderMarkers() {
    const { pickupCoordinates } = this.state;
    return pickupCoordinates.map((coordinates, i) => {
      return <Marker key={i} position={coordinates} />;
    });
  }

  render() {
    const { google } = this.props;

    return (
      <MapWrapper>
        <Map google={google} zoom={ZOOM} initialCenter={INITIAL_CENTER}>
          {this.renderMarkers()}
        </Map>
      </MapWrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(PickupMap);
