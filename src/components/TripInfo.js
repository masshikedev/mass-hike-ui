import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TripInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TripDetail-details">
        <h3>PICKUP</h3>
        <p>{this.props.props.time.pickupStart}</p>
        <h3>LOCATION</h3>
        <p>{this.props.props.location}</p>
        <h3>DIFFICULTY</h3>
        <p>{this.props.props.difficulty}</p>
        <h3>PRICE</h3>
        <p>${this.props.props.price}</p>
        <h3>AVAILIBILITY</h3>
        <p>
          {this.props.props.capacity - this.props.props.ticketsSold}/{
            this.props.props.capacity
          }
        </p>
      </div>
    );
  }
}

export default TripInfo;
