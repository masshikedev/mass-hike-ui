import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DetailDescription from '../components/DetailDescription';
import TripInfo from '../components/TripInfo';
import { getTripById } from '../actions/CurrentTripActions';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import renderByStatus from '../utils/renderByStatus';
import { H1, H3, Img, Container, GridParent, MediaQueries } from '../style';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';

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

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess() {
    const { trip } = this.props;
    const dateString = format(trip.time.hikeStart, MONTH_DATE_YEAR);
    return (
      <div>
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
      </div>
    );
  }

  render() {
    const { status } = this.props;
    return (
      <Container>
        {renderByStatus(
          status,
          () => this.renderLoading(),
          () => this.renderSuccess(),
          () => this.renderError()
        )}
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
