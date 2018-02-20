import React from 'react';
import TripInfo from '../components/TripInfo';
import trips from '../data/trips';
import previewImage from '../images/square.png';
import styled from 'styled-components';
import { P, H1, H2 } from '../style';

const Wrapper = styled.div`
  margin-bottom: 72px;
`;

const DetailWrapper = styled.div`
  display: flex;
  width: 75%;
`;

const DetailDescription = styled.div`
  margin-right: 60px;
  width: 75%;
`;

const Img = styled.img`
  width: 55%;
`;

function TripDetail(props) {
  const trip = trips[props.match.params.id];
  return (
    <Wrapper>
      <div>
        <H1>{trip.name}</H1>
        <Img src={previewImage} />
      </div>
      <DetailWrapper>
        <DetailDescription>
          <H2>{trip.detail.title}</H2>
          <P>{trip.detail.body}</P>
        </DetailDescription>
        <TripInfo {...trip} />
      </DetailWrapper>
    </Wrapper>
  );
}

export default TripDetail;
