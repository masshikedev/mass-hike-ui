import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import LoadableComponent from '../components/LoadableComponent';
import AdminPage from '../components/admin/AdminPage';
import Ticketing from '../components/admin/tripDetail/Ticketing';
import TripDetailList from '../components/admin/tripDetail/TripDetailList';
import EditTrip from '../components/admin/tripDetail/EditTrip';
import TripTabBar from '../components/admin/tripDetail/TripTabBar';
import { adminGetTripById } from '../actions/CurrentTripActions';
import { AdminContainer, H2, P, GridParent, constants } from '../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';

const SECTION_COMPONENTS = [
  { path: 'ticketing', component: Ticketing },
  { path: 'details', component: TripDetailList },
  { path: 'edit', component: EditTrip },
];

const HeaderSection = styled.div`
  background-color: ${constants.darkgray};
  padding-bottom: 30px;
`;

const Header = H2.extend`
  margin-bottom: 5px;
`;

const SubtitleInfo = styled.div`
  grid-column: span 8;
`;

const SubtitleLink = styled.div`
  grid-column: span 4;
  text-align: right;
  > a {
    color: #000000;
    text-decoration: underline;
    font-size: 16px;
  }
`;

class AdminTripDetail extends LoadableComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMapMarker: null,
      currentSection: 0,
    };
  }

  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  setCurrentSection = section => {
    this.setState({ currentSection: section });
  };

  renderSectionRoutes() {
    const { trip, match } = this.props;
    return SECTION_COMPONENTS.map((data, i) => {
      const SectionComponent = data.component;
      return (
        <Route
          key={i}
          exact
          path={`${match.url}/${data.path}`}
          render={() => (
            <SectionComponent
              trip={trip}
              setCurrentSection={this.setCurrentSection}
            />
          )}
        />
      );
    });
  }

  renderSubtitle() {
    const { trip } = this.props;
    const dateString = moment.utc(trip.time.hikeStart).format(MONTH_DATE_YEAR);
    if (trip.cancelled) {
      return (
        <SubtitleInfo>
          <P bold proxima color="error">
            Cancelled
          </P>
        </SubtitleInfo>
      );
    }
    return (
      <SubtitleInfo>
        <P>{`${dateString} - ${trip.location}`}</P>
      </SubtitleInfo>
    );
  }

  renderSuccess = () => {
    const { trip } = this.props;
    const { currentSection } = this.state;
    return (
      <div>
        <HeaderSection>
          <AdminContainer>
            <Header>{trip.name}</Header>
            <GridParent>
              {this.renderSubtitle()}
              <SubtitleLink>
                <Link to={`/trips/${trip.tripId}`}>
                  View on booking platform
                </Link>
              </SubtitleLink>
            </GridParent>
            <TripTabBar currentSection={currentSection} trip={trip} />
          </AdminContainer>
        </HeaderSection>
        <AdminContainer>
          <Switch>{this.renderSectionRoutes()}</Switch>
        </AdminContainer>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  status: state.currentTrip.adminStatus,
  trip: state.currentTrip.adminTrip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTripById: adminGetTripById }, dispatch);

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(AdminTripDetail)
);
