import React from 'react';
import DetailDescription from '../components/DetailDescription';
import TripInfo from '../components/TripInfo';
import trips from '../data/trips';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import { P, H1, H3 } from '../style';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';

const Wrapper = styled.div`
  width: 75%;
`;

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 650px auto;

  @media (max-width: 700px) {
    grid-template-columns: 50px 400px auto;
  }
`;

//When on mobile, style is switched to that of H2,
//unsure how to switch between tags based on screen size
const Title = H1.extend`
  margin: 0;

  @media (max-width: 700px) {
    font-size: 48px;
    font-weight: bold;
    height: auto;
    width: auto;
  }
`;

const Img = styled.img`
  width: 100%;

  @media (max-width: 700px) {
    width: auto;
  }
`;

function TripDetail(props) {
  const trip = trips[props.match.params.id];
  const dateString = format(trip.time.hikeStart * 1000, MONTH_DATE_YEAR);
  return (
    <Wrapper>
      <div>
        <Title>{trip.name}</Title>
        <H3>{`${dateString} - ${trip.location}`}</H3>
        <br />
        <Img src={previewImage} />
      </div>
      <DetailWrapper>
        <DetailDescription {...trip} />
        <TripInfo {...trip} id={props.match.params.id} />
      </DetailWrapper>
    </Wrapper>
  );
}

export default TripDetail;
