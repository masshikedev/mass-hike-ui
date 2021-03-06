import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import AdminPage from '../components/admin/AdminPage';
import TripGrid from '../components/admin/TripGrid';
import MemberGrid from '../components/admin/members/MemberGrid';
import AppointmentGrid from '../components/admin/AppointmentGrid';
import AvailabilityForm from '../components/admin/AvailabilityForm';
import LoadableComponent from '../components/LoadableComponent';
import { adminGetAllTrips } from '../actions/TripListActions';
import { adminGetAllMembers } from '../actions/MemberActions';
import { adminGetUnpaidOrders } from '../actions/OrderActions';
import { getAvailability } from '../actions/AvailabilityActions';
import { H2, AdminContainer, Button } from '../style';
import combineStatus from '../utils/combineStatus';

const DashboardButton = Button.extend`
  margin-bottom: 50px;
  margin-right: 30px;
`;

class AdminDashboard extends LoadableComponent {
  componentWillMount() {
    const {
      adminGetAllTrips,
      adminGetAllMembers,
      adminGetUnpaidOrders,
      getAvailability,
    } = this.props;
    adminGetAllTrips();
    adminGetUnpaidOrders();
    adminGetAllMembers();
    getAvailability();
  }

  renderSuccess = () => {
    const {
      upcomingTrips,
      members,
      unpaidOrders,
      availableTimes,
      toMemberList,
      toMemberForm,
      toTripList,
      toTripForm,
      toEditAvailability,
    } = this.props;
    return (
      <AdminContainer>
        <H2>Upcoming Trips</H2>
        <TripGrid trips={upcomingTrips} showTickets={true} />
        <DashboardButton onClick={toTripList}>All Trips</DashboardButton>
        <DashboardButton onClick={toTripForm}>New Trip</DashboardButton>
        <H2>Cash Appointments</H2>
        <AppointmentGrid orders={unpaidOrders} />
        <H2>Cash Availability</H2>
        <AvailabilityForm availability={availableTimes} />
        <DashboardButton onClick={toEditAvailability}>
          Edit Availability
        </DashboardButton>
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
  unpaidOrders: state.orders.unpaidOrders.filter(
    order => !order.trip.cancelled
  ),
  members: state.members.members.slice(0, 10),
  availableTimes: state.availability.times,
  availableLocations: state.availability.locations,
  status: combineStatus(
    state.tripList.adminStatus,
    state.orders.unpaidOrdersStatus,
    state.members.membersStatus,
    state.availability.status
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminGetAllTrips,
      adminGetAllMembers,
      adminGetUnpaidOrders,
      getAvailability,
      toTripList: () => push('/admin/trips'),
      toTripForm: () => push('/admin/trips/new'),
      toMemberList: () => push('/admin/members'),
      toMemberForm: () => push('/admin/members/new'),
      toEditAvailability: () => push('/admin/availability'),
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
);
