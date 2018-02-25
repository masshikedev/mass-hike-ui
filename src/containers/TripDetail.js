import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DetailDescription from '../components/DetailDescription';
import TripInfo from '../components/TripInfo';
import { getTripById } from '../actions/CurrentTripActions';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import { H1, H3, Img, Container, GridParent, MediaQueries } from '../style';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';
import RequestStatus from '../RequestStatus';

const Title = H1.extend`
  margin-bottom: 10px;
`;

const DetailSection = GridParent.extend`
  margin-top: 30px;
`;

const Divider = styled.div`
  grid-column: span 1;
  border-right: 3px solid #000;

  ${MediaQueries} {
    grid-column: 0;
    display: none;
  }
`;

class TripDetail extends Component {
  componentWillMount() {
    const { getTripById } = this.props;
    getTripById(this.props.match.params.id);
  }

  render() {
    const { trip, status } = this.props;
    if (status !== RequestStatus.SUCCESS) {
      return null;
    }
    const dateString = format(trip.time.hikeStart, MONTH_DATE_YEAR);
    return (
      <Container>
        <div>
          <Title>{trip.name}</Title>
          <H3>{`${dateString} - ${trip.location}`}</H3>
          <Img src={previewImage} />
        </div>
        <DetailSection>
          <DetailDescription {...trip} />
          <Divider />
          <TripInfo {...trip} id={this.props.match.params.id} />
        </DetailSection>
      </Container>
    );
  }
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
