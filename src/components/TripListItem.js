import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import previewImage from '../images/square.png'; // relative path to image

class TripListItem extends Component {
  render() {
    const { name, date, location, spotsRemaining, difficulty } = this.props;
    return (
      <div className="TripList-item-container">
        <img src={previewImage} alt={name} className="TripList-previewImage" />
        <div className="TripList-info">
          <h2>{`${name}`}</h2>
          <p>{`${date} - ${location}`}</p>
          <h4>{`${spotsRemaining} spots remaining`}</h4>
          <br />
          <p className="TripList-difficultyHeader">Difficulty</p>
          <p className="TripList-difficultyDescriptor">{`${difficulty}`}</p>
          <br />
          <button> Book Now </button>
        </div>
      </div>
    );
  }
}

export default TripListItem;
