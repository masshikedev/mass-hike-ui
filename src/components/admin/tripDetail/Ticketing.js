import React, { Component } from 'react';
import { AdminContainer, H5 } from '../../../style';
import OrderGrid from './OrderGrid';
import PickupMap from './PickupMap';
import PickupGrid from './PickupGrid';

const SECTION = 0;

class Ticketing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMapMarker: null,
    };
  }

  componentWillMount() {
    const { setCurrentSection } = this.props;
    setCurrentSection(SECTION);
  }

  render() {
    const { activeMapMarker } = this.state;
    const { trip } = this.props;
    return (
      <div>
        <H5>Ticket Sales</H5>
        <OrderGrid orders={trip.orders} capacity={trip.capacity} />
        <H5>Pickup Locations</H5>
        <PickupMap orders={trip.orders} activeMarker={activeMapMarker} />
        <PickupGrid
          orders={trip.orders}
          onClickOrder={index => this.setState({ activeMapMarker: index })}
        />
      </div>
    );
  }
}

export default Ticketing;
