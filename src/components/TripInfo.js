import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TripInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TripDetail-details">
        <h3>pickup</h3>
        <p>{this.props.time.pickupStart}</p>
        <h3>location</h3>
        <p>{this.props.location}</p>
        <h3>difficulty</h3>
        <p>{this.props.difficulty}</p>
        <h3>price</h3>
        <p>${this.props.price} per person</p>
        <h3>availibility</h3>
        <p>
          {this.props.capacity - this.props.ticketsSold}/{this.props.capacity}{' '}
          Tickets remaining
        </p>
        <button>Book Now</button>
      </div>
    );
  }
}

export default TripInfo;
