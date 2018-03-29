import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/admin/Login';
import TripGrid from '../components/admin/TripGrid';
import { getTripList } from '../actions/TripListActions';
import { H2, H3, Container, GridParent } from '../style';

class AdminDashboard extends Component {
  componentDidMount() {
    const { getTripList } = this.props;
    getTripList();
  }

  render() {
    const { loggedIn, upcomingTrips, pastTrips } = this.props;
    if (!loggedIn) {
      return <Login />;
    }
    return (
      <Container>
        <H2>Upcoming Trips</H2>
        <TripGrid trips={upcomingTrips} showTickets={true} />
        <H2>Past Trips</H2>
        <TripGrid trips={pastTrips} showTickets={false} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
  upcomingTrips: state.tripList.trips.filter(
    trip => trip.time.hikeStart >= Date.now()
  ),
  pastTrips: state.tripList.trips.filter(
    trip => trip.time.hikeStart < Date.now()
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripList: () => getTripList(true),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
