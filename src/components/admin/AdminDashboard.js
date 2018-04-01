import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import TripGrid from './TripGrid';
import { getTripList } from '../../actions/TripListActions';
import { H2, H3, Container, GridParent, Button } from '../../style';

const CreateButton = Button.extend`
  margin-bottom: 50px;
`;

class AdminDashboard extends Component {
  componentDidMount() {
    const { getTripList } = this.props;
    getTripList();
  }

  render() {
    const { upcomingTrips, pastTrips } = this.props;
    return (
      <Container>
        <H2>Upcoming Trips</H2>
        <TripGrid trips={upcomingTrips} showTickets={true} />
        <CreateButton>Create New</CreateButton>
        <H2>Past Trips</H2>
        <TripGrid trips={pastTrips} showTickets={false} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
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
