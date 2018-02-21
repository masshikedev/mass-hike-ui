import React from 'react';
import styled from 'styled-components';
import { H2, H6, P } from '../style';

const Wrapper = styled.div`
  grid-column: span 7;

  @media (max-width: 767px) {
    grid-column: span 12;
  }
`;

function DetailDescription(props) {
  const { detail } = props;
  return (
    <Wrapper>
      <H2>{detail.title}</H2>
      <P>{detail.body}</P>
      <H6>pickup</H6>
      <P>pickup time range will go here</P>
      <H6>hike time</H6>
      <P>hike time range will go here</P>
      <H6>dropoff</H6>
      <P>dropoff time range will go here</P>
    </Wrapper>
  );
}

export default DetailDescription;
