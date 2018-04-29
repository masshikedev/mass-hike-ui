import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import LoadableComponent from '../components/LoadableComponent';
import AdminPage from '../components/admin/AdminPage';
import TripGrid from '../components/admin/TripGrid';
import { adminGetAllTrips } from '../actions/TripListActions';
import { H2, AdminContainer, Button, GridParent, Input } from '../style';
import styled from 'styled-components';

const SearchBar = Input.extend`
  width: 100%;
  margin-bottom: 30px;
`;

const TitleColumn = styled.div`
  grid-column: span 9;
`;

const ButtonColumn = styled.div`
  grid-column: span 3;
`;

const NewTripButton = Button.extend`
  margin-top: 20px;
`;

class AdminTripList extends LoadableComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentWillMount() {
    const { adminGetAllTrips } = this.props;
    adminGetAllTrips();
  }

  onSearch = e => {
    this.setState({ search: e.target.value });
  };

  renderSuccess = () => {
    const { toNew, upcomingTrips, pastTrips, cancelledTrips } = this.props;
    const { search } = this.state;
    return (
      <AdminContainer>
        <GridParent>
          <TitleColumn>
            <H2>Trips</H2>
          </TitleColumn>
          <ButtonColumn>
            <NewTripButton onClick={toNew}>New Trip</NewTripButton>
          </ButtonColumn>
        </GridParent>
        <SearchBar
          placeholder="Search"
          value={search}
          onChange={this.onSearch}
        />
        <TripGrid
          title="Upcoming Trips"
          trips={upcomingTrips}
          showTickets
          search={search}
        />
        <TripGrid title="Past Trips" trips={pastTrips} search={search} />
        <TripGrid
          title="Cancelled Trips"
          trips={cancelledTrips}
          search={search}
        />
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  upcomingTrips: state.tripList.adminTrips.filter(
    trip => !trip.cancelled && trip.time.hikeStart >= Date.now()
  ),
  pastTrips: state.tripList.adminTrips.filter(
    trip => !trip.cancelled && trip.time.hikeStart < Date.now()
  ),
  cancelledTrips: state.tripList.adminTrips.filter(trip => trip.cancelled),
  status: state.tripList.adminStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminGetAllTrips,
      toNew: () => push('/admin/trips/new'),
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminTripList)
);
