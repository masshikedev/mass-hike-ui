import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripData } from '../actions/TripActions';
import TripListItem from '../components/TripListItem';
import { H1 } from '../style';

const Title = H1.extend`
  @media (max-width: 700px) {
    display: none;
  }
`;

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
      return (
        <TripListItem
          key={i}
          id={trip.id}
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
      <div>
        <Title>Upcoming Trips</Title>
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
