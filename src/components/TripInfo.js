import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function TripInfo(props) {
  return (
    <div className="TripDetail-details">
      <h3>pickup</h3>
      <p>{props.time.pickupStart}</p>
      <h3>location</h3>
      <p>{props.location}</p>
      <h3>difficulty</h3>
      <p>{props.difficulty}</p>
      <h3>price</h3>
      <p>${props.price} per person</p>
      <h3>availibility</h3>
      <p>
        {props.capacity - props.ticketsSold}/{props.capacity} Tickets remaining
      </p>
      <button>Book Now</button>
    </div>
  );
}

export default TripInfo;
