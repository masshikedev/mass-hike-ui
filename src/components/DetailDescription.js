import React from 'react';
import styled from 'styled-components';
import { H2, H6, P, constants, MediaQueries } from '../style';
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

const Timeline = styled.div`
  display: flex;
  text-align: center;
  padding: 40px 0;
`;

const SmallTime = styled.div`
  flex: 1;
`;

const LargeTime = styled.div`
  flex: 3;
`;

const Graphic = styled.div`
  background-color: ${({ primary }) => (primary ? '#F6BD69' : '#BDCFA8')};
  width: 80%;
  height: 20px;
  margin: 0 auto;
  border-radius: 20px;
`;

const Line = styled.div`
  height: 20px;
  width 100%;

  :after {
    position: relative;
    left: 0;
    top: -50%;
    height: 1px;
    background: #000;
    content: "";
    width: 100%;
    display: block;
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
      <Timeline>
        <SmallTime>
          <H6>pickup</H6>
          <Line>
            <Graphic />
          </Line>
          <P>{`${format(time.pickupStart, TIME)} - ${format(
            time.pickupEnd,
            TIME
          )}`}</P>
        </SmallTime>
        <LargeTime>
          <H6>hike time</H6>
          <Line>
            <Graphic primary />
          </Line>
          <P>{`${format(time.hikeStart, TIME)} - ${format(
            time.hikeEnd,
            TIME
          )}`}</P>
        </LargeTime>
        <SmallTime>
          <H6>dropoff</H6>
          <Line>
            <Graphic />
          </Line>
          <P>{`${format(time.dropoffStart, TIME)} - ${format(
            time.dropoffEnd,
            TIME
          )}`}</P>
        </SmallTime>
      </Timeline>
    </Wrapper>
  );
}

export default DetailDescription;
