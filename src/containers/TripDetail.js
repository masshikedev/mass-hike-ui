import React, { Component } from 'react';
import TripInfo from '../components/TripInfo';
import { Link } from 'react-router-dom';
import trips from '../data/trips';
import previewImage from '../images/square.png';

const BlueHills = trips[0];

console.log(BlueHills);

class TripDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TripDetail">
        <div>
          <h1>{BlueHills.name}</h1>
          <img src={previewImage} className="TripDetail-image" />
        </div>
        <div className="flex-container">
          <div className="TripDetail-description">
            <h2>{BlueHills.detail.title}</h2>
            <p>{BlueHills.detail.body}</p>
          </div>
          <TripInfo className="TripDetail-flex-child" props={BlueHills} />
        </div>
      </div>
    );
  }
}

export default TripDetail;
