import React from 'react';
import { P, H3, H6 } from '../style';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
      <H6>pickup</H6>
      <P>{pickupString}</P>
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
