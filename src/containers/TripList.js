import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripList } from '../actions/TripListActions';
import TripListItem from '../components/TripListItem';
import renderByStatus from '../utils/renderByStatus';
import { H1, H3, Container } from '../style';

class TripList extends Component {
  componentWillMount() {
    const { getTripList } = this.props;
    getTripList();
  }

  spotsRemaining(trip) {
    return trip.capacity - trip.ticketsSold;
  }

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess() {
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
    return (
      <div>
        <H1>Upcoming Trips</H1>
        {tripComponents}
      </div>
    );
  }

  render() {
    const { status } = this.props;
    return (
      <Container>
        {renderByStatus(
          status,
          () => this.renderLoading(),
          () => this.renderSuccess(),
          () => this.renderError()
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.tripList.trips,
  status: state.tripList.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
