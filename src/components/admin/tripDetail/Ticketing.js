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

  paidOrders() {
    const { trip } = this.props;
    return trip.orders.filter(order => !order.cancelled && order.paid);
  }

  outstandingOrders() {
    const { trip } = this.props;
    return trip.orders.filter(order => !order.cancelled && !order.paid);
  }

  cancelledOrders() {
    const { trip } = this.props;
    return trip.orders.filter(order => order.cancelled);
  }

  ordersForPickup() {
    const { trip } = this.props;
    return trip.orders.filter(order => !order.cancelled);
  }

  render() {
    const { activeMapMarker } = this.state;
    const { trip } = this.props;
    return (
      <div>
        <H5>Ticket Sales</H5>
        <OrderGrid orders={this.paidOrders()} capacity={trip.capacity} />
        {this.outstandingOrders().length > 0 && (
          <div>
            <H5>Outstanding Orders</H5>
            <OrderGrid orders={this.outstandingOrders()} />
          </div>
        )}
        {this.cancelledOrders().length > 0 && (
          <div>
            <H5>Cancelled Orders</H5>
            <OrderGrid cancelled orders={this.cancelledOrders()} />
          </div>
        )}
        <H5>Pickup Locations</H5>
        <PickupMap
          orders={this.ordersForPickup()}
          activeMarker={activeMapMarker}
        />
        <PickupGrid
          orders={this.ordersForPickup()}
          onClickOrder={index => this.setState({ activeMapMarker: index })}
        />
      </div>
    );
  }
}

export default Ticketing;
