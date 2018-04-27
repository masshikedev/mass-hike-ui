import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import AdminPage from '../components/admin/AdminPage';
import TripGrid from '../components/admin/TripGrid';
import MemberGrid from '../components/admin/members/MemberGrid';
import AppointmentGrid from '../components/admin/AppointmentGrid';
import LoadableComponent from '../components/LoadableComponent';
import { adminGetAllTrips } from '../actions/TripListActions';
import { adminGetAllMembers } from '../actions/MemberActions';
import { H2, AdminContainer, Button } from '../style';
import { RequestStatus } from '../constants';
import combineStatus from '../utils/combineStatus';

const DashboardButton = Button.extend`
  margin-bottom: 50px;
  margin-right: 30px;
`;

class AdminDashboard extends LoadableComponent {
  componentWillMount() {
    const { adminGetAllTrips, adminGetAllMembers } = this.props;
    adminGetAllTrips();
    adminGetAllMembers();
  }

  renderSuccess = () => {
    const {
      upcomingTrips,
      pastTrips,
      members,
      status,
      toMemberList,
      toMemberForm,
      toTripList,
      toTripForm,
    } = this.props;
    if (status !== RequestStatus.SUCCESS) {
      return null;
    }
    return (
      <AdminContainer>
        <H2>Upcoming Trips</H2>
        <TripGrid trips={upcomingTrips} showTickets={true} />
        <DashboardButton onClick={toTripList}>All Trips</DashboardButton>
        <DashboardButton onClick={toTripForm}>New Trip</DashboardButton>
        <H2>Cash Appointments</H2>
        <AppointmentGrid />
        <H2>Recent Signups</H2>
        <MemberGrid members={members} />
        <DashboardButton onClick={toMemberList}>All Members</DashboardButton>
        <DashboardButton onClick={toMemberForm}>New Member</DashboardButton>
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  upcomingTrips: state.tripList.adminTrips.filter(
    trip => !trip.cancelled && trip.time.hikeStart >= Date.now()
  ),
  members: state.members.members.slice(0, 10),
  status: combineStatus(
    state.tripList.adminStatus,
    state.members.membersStatus
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminGetAllTrips,
      adminGetAllMembers,
      toTripList: () => push('/admin/trips'),
      toTripForm: () => push('/admin/trips/new'),
      toMemberList: () => push('/admin/members'),
      toMemberForm: () => push('/admin/members/new'),
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
);
