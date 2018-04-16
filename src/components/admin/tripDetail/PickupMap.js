import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { P, H6 } from '../../../style';
import styled from 'styled-components';
import { GOOGLE_MAPS_API_KEY } from '../../../constants';

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
      activeMarker: null,
    };
  }

  componentWillMount() {
    this.setCordinates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeMarker !== null) {
      this.setState({ activeMarker: nextProps.activeMarker });
    }
  }

  preferredContact(order) {
    if (order.preferredContactMethods.includes('email')) {
      return order.email;
    }
    return order.phone;
  }

  setCoordinatePair = (results, status) => {
    const { google, orders } = this.props;
    const { pickupCoordinates } = this.state;
    if (status === google.maps.GeocoderStatus.OK) {
      pickupCoordinates.push({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      });
    }
    if (pickupCoordinates.length === orders.length) {
      this.setState({ pickupCoordinates });
    }
  };

  setCordinates() {
    const { google, orders } = this.props;
    const { pickupCoordinates } = this.state;
    const geocoder = new google.maps.Geocoder();
    orders.forEach(order => {
      geocoder.geocode(
        { address: order.pickupLocation },
        this.setCoordinatePair
      );
    });
  }

  onClickMarker = index => {
    this.setState({ activeMarker: index });
  };

  renderMarkers() {
    const { pickupCoordinates } = this.state;
    const { orders } = this.props;
    return pickupCoordinates.map((coordinates, i) => {
      const { activeMarker } = this.state;
      const order = orders[i];
      return [
        <InfoWindow position={coordinates} visible={activeMarker === i}>
          <div>
            <H6>{order.name}</H6>
            <P>{order.pickupLocation}</P>
            <P>{this.preferredContact(order)}</P>
          </div>
        </InfoWindow>,
        <Marker
          key={i}
          position={coordinates}
          onClick={() => this.onClickMarker(i)}
        />,
      ];
    });
  }

  render() {
    const { google, zoom, center } = this.props;
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
