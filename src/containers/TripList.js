import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripList } from '../actions/TripListActions';
import TripListItem from '../components/TripListItem';
import renderByStatus from '../utils/renderByStatus';
import { H1, P, H3, MediaQueries, Container } from '../style';
import styled from 'styled-components';

const Trips = styled.div`
  padding: 0 80px;

  ${MediaQueries.small} {
    padding: 0;
  }
`;

const Title = styled.div`
  text-align: center;
  padding-top: 40px;
`;

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

  renderSuccess = () => {
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
        <Title>
          <P proxima size="large" bold>
            Take a look at our
          </P>
          <H1>Upcoming Trips</H1>
        </Title>
        <Trips>{tripComponents}</Trips>
      </div>
    );
  };

  render() {
    const { status } = this.props;
    return (
      <Container>
        {renderByStatus(
          status,
          this.renderLoading,
          this.renderSuccess,
          this.renderError
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
