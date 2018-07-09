import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { P, H6 } from '../../../style';
import styled from 'styled-components';
import { GOOGLE_MAPS_API_KEY } from '../../../constants';

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ZOOM = 12;
const INITIAL_CENTER = {
  lat: 42.3493142,
  lng: -71.0676855,
};

class PickupMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerData: {},
      activeMarker: null,
    };
  }

  componentWillMount() {
    this.setAllMarkerData();
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

  setMarker = (results, status, order) => {
    const { google } = this.props;
    const { markerData } = this.state;
    if (status === google.maps.GeocoderStatus.OK) {
      this.setState({
        markerData: {
          ...markerData,
          [order._id]: {
            coordinates: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
            order,
          },
        },
      });
    }
  };

  setAllMarkerData() {
    const { google, orders } = this.props;
    const geocoder = new google.maps.Geocoder();
    orders.forEach(order => {
      geocoder.geocode({ address: order.pickupLocation }, (results, status) =>
        this.setMarker(results, status, order)
      );
    });
  }

  onClickMarker = index => {
    this.setState({ activeMarker: index });
  };

  renderMarkers() {
    const { markerData, activeMarker } = this.state;
    const markers = [];
    for (let orderId in markerData) {
      const currentMarkerData = markerData[orderId];
      const { order, coordinates } = currentMarkerData;
      markers.push([
        <InfoWindow
          position={coordinates}
          visible={activeMarker === orderId}
          onClose={() => this.setState({ activeMarker: null })}
        >
          <div>
            <H6>{order.name}</H6>
            <P>{order.pickupLocation}</P>
            <P>{this.preferredContact(order)}</P>
          </div>
        </InfoWindow>,
        <Marker
          key={orderId}
          position={coordinates}
          onClick={() => this.onClickMarker(orderId)}
        />,
      ]);
    }
    return markers;
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
