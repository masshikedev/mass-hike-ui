import React from 'react';
import DetailDescription from '../components/DetailDescription';
import TripInfo from '../components/TripInfo';
import trips from '../data/trips';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import { H1, H3, Img, Container, GridParent } from '../style';
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

  @media (max-width: 767px) {
    grid-column: 0;
    display: none;
  }
`;

function TripDetail(props) {
  const trip = trips[props.match.params.id];
  const dateString = format(trip.time.hikeStart * 1000, MONTH_DATE_YEAR);
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
        <TripInfo {...trip} id={props.match.params.id} />
      </DetailSection>
    </Container>
  );
}

export default TripDetail;
