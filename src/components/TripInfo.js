import React from 'react';
import H3 from '../style/H3';
import P from '../style/P';
import Button from '../style/Button';
import styled from 'styled-components';
import { format } from 'date-fns';
import dateFormats from '../data/dateFormats';

const Wrapper = styled.div`
  flex: 1;
`;

function TripInfo(props) {
  const pickupString = format(
    props.time.pickupStart,
    dateFormats.DAY_MONTH_DATE_TIME
  );
  return (
    <Wrapper>
      <H3>pickup</H3>
      <P>{pickupString}</P>
      <H3>location</H3>
      <P>{props.location}</P>
      <H3>difficulty</H3>
      <P>{props.difficulty}</P>
      <H3>price</H3>
      <P>${props.price} per person</P>
      <H3>availibility</H3>
      <P>
        {props.capacity - props.ticketsSold}/{props.capacity} Tickets remaining
      </P>
      <Button>Book Now</Button>
    </Wrapper>
  );
}

export default TripInfo;
