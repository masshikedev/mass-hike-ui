import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import H3 from '../style/H3';
import P from '../style/P';
import Button from '../style/Button';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DAY_MONTH_DATE_TIME } from '../utils/dateFormats';

const Wrapper = styled.div`
  flex: 1;
`;

function TripInfo(props) {
  const pickupString = format(props.time.pickupStart, DAY_MONTH_DATE_TIME);
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
      <Button onClick={() => props.toCheckout(props.id)}>Book Now</Button>
    </Wrapper>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toCheckout: id => push(`${id}/checkout`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripInfo);
