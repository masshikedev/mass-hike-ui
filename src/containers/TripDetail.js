import React from 'react';
import TripInfo from '../components/TripInfo';
import trips from '../data/trips';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import { P, H1, H2 } from '../style';

const Wrapper = styled.div`
  width: 75%;
`;

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 650px auto;
`;

const Title = H1.extend`
  margin: 0;
`;

const DetailDescription = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  padding: 10px;
`;

const Img = styled.img`
  width: 100%;
`;

function TripDetail(props) {
  const trip = trips[props.match.params.id];
  const date = Calendar.dateString(new Date(trip.time.hikeStart * 1000));
  const pickupTime = new Date(trip.time.pickupStart * 1000);
  const hikeTime = new Date(trip.time.pickupStart * 1000);
  const dropoffTime = new Date(trip.time.pickupStart * 1000);
  //TODO: move description into its own component
  return (
    <Wrapper>
      <div>
        <Title>{trip.name}</Title>
        <H3>{`${date} - ${trip.location}`}</H3>
        <br />
        <Img src={previewImage} />
      </div>
      <DetailWrapper>
        <DetailDescription>
          <H2>{trip.detail.title}</H2>
          <P>{trip.detail.body}</P>
          <H6>pickup</H6>
          <P>pickup time range will go here</P>
          <H6>hike time</H6>
          <P>hike time range will go here</P>
          <H6>dropoff</H6>
          <P>dropoff time range will go here</P>
        </DetailDescription>
        <TripInfo {...trip} id={props.match.params.id} />
      </DetailWrapper>
    </Wrapper>
  );
}

export default TripDetail;
