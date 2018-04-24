import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import AdminPage from '../components/admin/AdminPage';
import TripGrid from '../components/admin/TripGrid';
import MemberGrid from '../components/admin/members/MemberGrid';
import LoadableComponent from '../components/LoadableComponent';
import { adminGetAllTrips } from '../actions/TripListActions';
import { adminGetAllMembers } from '../actions/MemberActions';
import { H2, AdminContainer, Button } from '../style';
import { RequestStatus } from '../constants';
import combineStatus from '../utils/combineStatus';

const CreateButton = Button.extend`
  margin-bottom: 50px;
`;

const MemberLinkButton = Button.extend`
  margin-right: 30px;
`;

class AdminDashboard extends LoadableComponent {
  componentWillMount() {
    const { adminGetAllTrips, adminGetAllMembers } = this.props;
    adminGetAllTrips();
    adminGetAllMembers();
  }

  onClickCreate = e => {
    const { toCreateTrip } = this.props;
    e.preventDefault();
    toCreateTrip();
  };

  renderSuccess = () => {
    const {
      upcomingTrips,
      pastTrips,
      members,
      status,
      toMemberList,
      toMemberForm,
    } = this.props;
    if (status !== RequestStatus.SUCCESS) {
      return null;
    }
    console.log(members);
    return (
      <AdminContainer>
        <H2>Upcoming Trips</H2>
        <TripGrid trips={upcomingTrips} showTickets={true} />
        <CreateButton onClick={this.onClickCreate}>Create New</CreateButton>
        <H2>Past Trips</H2>
        <TripGrid trips={pastTrips} showTickets={false} />
        <H2>Recent Signups</H2>
        <MemberGrid members={members} />
        <MemberLinkButton onClick={toMemberList}>All Members</MemberLinkButton>
        <MemberLinkButton>New Member</MemberLinkButton>
      </AdminContainer>
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
  members: state.members.members,
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
      toCreateTrip: () => push('/admin/trips/new'),
      toMemberList: () => push('/admin/members'),
      toMemberForm: () => push('/admin/members/new'),
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
);
