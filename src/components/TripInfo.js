import React from 'react';
import { P, H3, H6 } from '../style';
import Button from '../style/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
`;

function TripInfo(props) {
  return (
    <Wrapper>
      <H6>pickup</H6>
      <P>{props.time.pickupStart}</P>
      <H6>location</H6>
      <P>{props.location}</P>
      <H6>difficulty</H6>
      <P>{props.difficulty}</P>
      <H6>price</H6>
      <P>${props.price} per person</P>
      <H6>availibility</H6>
      <P>
        {props.capacity - props.ticketsSold}/{props.capacity} Tickets remaining
      </P>
      <Button>Book Now</Button>
    </Wrapper>
  );
}

export default TripInfo;
