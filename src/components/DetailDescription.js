import React from 'react';
import styled from 'styled-components';
import { getDate, getTime } from '../utils/dateFormats';
import { H2, H6, P } from '../style';

const Wrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  padding: 10px;
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
