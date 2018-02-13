import React, { Component } from 'react';
import TripInfo from '../components/TripInfo';
import { Link } from 'react-router-dom';
import trips from '../data/trips';
import previewImage from '../images/square.png';

class TripDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const trip = trips[this.props.match.params.id];
    return (
      <div className="TripDetail">
        <div>
          <h1>{trip.name}</h1>
          <img src={previewImage} className="TripDetail-image" />
        </div>
        <div className="flex-container">
          <div className="TripDetail-description">
            <h2>{trip.detail.title}</h2>
            <p>{trip.detail.body}</p>
          </div>
          <TripInfo className="TripDetail-flex-child" {...trip} />
        </div>
      </div>
    );
  }
}

export default TripDetail;
