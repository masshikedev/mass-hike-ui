import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripData } from '../actions/TripActions';
import TripListItem from '../components/TripListItem';
import Calendar from '../data/Calendar';
import H1 from '../style/H1';

class TripList extends Component {
  componentWillMount() {
    const { getTripData } = this.props;
    getTripData();
  }
  spotsRemaining(trip) {
    return trip.capacity - trip.ticketsSold;
  }
  renderTripComponents() {
    const { trips = [] } = this.props;
    const tripComponents = trips.map((trip, i) => {
      const date = new Date(trip.time.hikeStart * 1000);
      return (
        <TripListItem
          key={i}
          name={trip.name}
          date={Calendar.dateString(date)}
          location={trip.location}
          difficulty={trip.difficulty}
          spotsRemaining={this.spotsRemaining(trip)}
        />
      );
    });
    return tripComponents;
  }
  render() {
    return (
      <div>
        <H1>Upcoming Trips</H1>
        {this.renderTripComponents()}
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips.tripList,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
