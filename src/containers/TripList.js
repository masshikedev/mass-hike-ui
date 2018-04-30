import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripList } from '../actions/TripListActions';
import TripListItem from '../components/TripListItem';
import LoadableComponent from '../components/LoadableComponent';
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

const TitleContent = H1.extend`
  margin-bottom: 20px;
`;

class TripList extends LoadableComponent {
  componentWillMount() {
    const { getTripList } = this.props;
    getTripList();
  }

  spotsRemaining(trip) {
    return trip.capacity - trip.ticketsSold;
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
          imageUrl={trip.detail.imageUrl}
        />
      );
    });
    return (
      <Container>
        <div>
          <Title>
            <P proxima size="large" bold>
              Take a look at our
            </P>
            <TitleContent center>Upcoming Trips</TitleContent>
          </Title>
          <Trips>{tripComponents}</Trips>
        </div>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  trips: state.tripList.trips,
  status: state.tripList.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripList: () => getTripList(false),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
