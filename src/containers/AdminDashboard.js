import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import AdminPage from '../components/admin/AdminPage';
import TripGrid from '../components/admin/TripGrid';
import LoadableComponent from '../components/LoadableComponent';
import { adminGetTripList } from '../actions/TripListActions';
import { H2, H3, Container, GridParent, Button } from '../style';
import { RequestStatus } from '../constants';

const CreateButton = Button.extend`
  margin-bottom: 50px;
`;

class AdminDashboard extends LoadableComponent {
  componentWillMount() {
    const { adminGetTripList } = this.props;
    adminGetTripList();
  }

  onClickCreate = e => {
    const { toCreateTrip } = this.props;
    e.preventDefault();
    toCreateTrip();
  };

  renderSuccess = () => {
    const { upcomingTrips, pastTrips, status } = this.props;
    if (status !== RequestStatus.SUCCESS) {
      return null;
    }
    return (
      <AdminPage>
        <Container>
          <H2>Upcoming Trips</H2>
          <TripGrid trips={upcomingTrips} showTickets={true} />
          <CreateButton onClick={this.onClickCreate}>Create New</CreateButton>
          <H2>Past Trips</H2>
          <TripGrid trips={pastTrips} showTickets={false} />
        </Container>
      </AdminPage>
    );
  };
}

const mapStateToProps = state => ({
  upcomingTrips: state.tripList.adminTrips.filter(
    trip => trip.time.hikeStart >= Date.now()
  ),
  pastTrips: state.tripList.adminTrips.filter(
    trip => trip.time.hikeStart < Date.now()
  ),
  status: state.tripList.adminStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminGetTripList,
      toCreateTrip: () => push('/admin/trips/new'),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
