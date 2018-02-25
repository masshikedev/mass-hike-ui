import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripList } from '../actions/TripListActions';
import TripListItem from '../components/TripListItem';
import { H1, Container } from '../style';

class TripList extends Component {
  componentWillMount() {
    const { getTripList } = this.props;
    getTripList();
  }
  spotsRemaining(trip) {
    return trip.capacity - trip.ticketsSold;
  }
  renderTripComponents() {
    const { trips = [] } = this.props;
    const tripComponents = trips.map((trip, i) => {
      return (
        <TripListItem
          key={i}
          tripId={trip.tripId}
          name={trip.name}
          date={trip.time.hikeStart}
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
      <Container>
        <H1>Upcoming Trips</H1>
        {this.renderTripComponents()}
        <br />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.tripList.trips,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
