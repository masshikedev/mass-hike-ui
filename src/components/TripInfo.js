import React from 'react';
import H3 from '../style/H3';
import P from '../style/P';
import Button from '../style/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
`;

function TripInfo(props) {
  return (
    <Wrapper>
      <H3>pickup</H3>
      <P>{props.time.pickupStart}</P>
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
      <form action={`${props.id}/checkout`}>
        <Button>Book Now</Button>
      </form>
    </Wrapper>
  );
}

export default TripInfo;
