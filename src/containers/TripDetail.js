import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DetailDescription from '../components/DetailDescription';
import TripInfo from '../components/TripInfo';
import { getTripById } from '../actions/CurrentTripActions';
import styled from 'styled-components';
import LoadableComponent from '../components/LoadableComponent';
import {
  H1,
  P,
  Container,
  constants,
  GridParent,
  MediaQueries,
} from '../style';
import moment from 'moment';
import { MONTH_DATE } from '../utils/dateFormats';

const Title = H1.extend`
  margin-bottom: 10px;
  color: #fff;
`;

const DetailSection = GridParent.extend`
  margin-top: 30px;
  grid-column: span 12;
`;

const Divider = styled.div`
  grid-column: span 1;
  border-right: 3px solid #000;

  ${MediaQueries} {
    grid-column: 0;
    display: none;
  }
`;

const TripImage = styled.div`
  grid-column: span 5;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: ${props => (props.soldOut ? 'grayscale(100%)' : 'none')};

  ${MediaQueries.small} {
    grid-column: span 12;
    min-height: 300px;
  }
`;

const TripWrapper = GridParent.extend``;

const Summary = GridParent.extend`
  grid-gap: 0;
  grid-column: span 12;
`;

const MainInfo = styled.div`
  grid-column: span 7;
  background: ${constants.lightgreenBg};
  padding: 170px 80px;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
`;

const Date = P.extend`
  position: absolute;
  background: #fff;
  top: 180px;
  padding: 5px 15px;

  ${MediaQueries.small} {
    display: none;
  }
`;

class TripDetail extends LoadableComponent {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.tripId);
  }

  renderSuccess = () => {
    const { trip } = this.props;
    const dateString = moment.utc(trip.time.hikeStart).format(MONTH_DATE);
    const soldOut = trip.capacity === trip.ticketsSold;
    return (
      <Container>
        <TripWrapper>
          <Date uppercase proxima color="orange" bold size="large">
            {soldOut ? 'Sold Out' : dateString}
          </Date>
          <Summary>
            <MainInfo>
              <P proxima bold size="large" color="white">
                Let's go to
              </P>
              <Title>{trip.name}</Title>
              <P proxima size="medium" color="white">
                {trip.detail.subheader}
              </P>
            </MainInfo>
            <TripImage bg={trip.detail.imageUrl} soldOut={soldOut} />
          </Summary>
          <DetailSection>
            <DetailDescription {...trip} />
            <Divider />
            <TripInfo {...trip} />
          </DetailSection>
        </TripWrapper>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  trip: state.currentTrip.trip,
  status: state.currentTrip.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripDetail);
