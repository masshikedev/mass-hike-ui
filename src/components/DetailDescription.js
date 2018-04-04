import React from 'react';
import styled from 'styled-components';
import { H2, H6, P, MediaQueries } from '../style';
import { format } from 'date-fns';
import { TIME } from '../utils/dateFormats';

const Wrapper = styled.div`
  grid-column: span 7;
  padding: 40px 80px;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
`;

function DetailDescription(props) {
  const { detail, time } = props;
  return (
    <Wrapper>
      <P proxima size="xlarge" bold>
        What you need to know
      </P>
      <P>{detail.body}</P>
      <H6>pickup</H6>
      <P>{`${format(time.pickupStart, TIME)} - ${format(
        time.pickupEnd,
        TIME
      )}`}</P>
      <H6>hike time</H6>
      <P>{`${format(time.hikeStart, TIME)} - ${format(time.hikeEnd, TIME)}`}</P>
      <H6>dropoff</H6>
      <P>{`${format(time.dropoffStart, TIME)} - ${format(
        time.dropoffEnd,
        TIME
      )}`}</P>
    </Wrapper>
  );
}

export default DetailDescription;
