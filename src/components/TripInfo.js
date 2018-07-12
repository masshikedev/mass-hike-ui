import React from 'react';
import { P, MediaQueries } from '../style';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../style/Button';
import styled from 'styled-components';
import moment from 'moment';
import { DAY_MONTH_DATE_TIME } from '../utils/dateFormats';

const Wrapper = styled.div`
  grid-column: span 4;
  padding: 40px 80px;
  padding-bottom: 70px;
  padding-left: 0;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding-top: 0;
  }
`;

const BookButton = Button.extend`
  ${MediaQueries.small} {
    position: fixed;
    bottom: 10px;
    width: 80%;
    max-width: none;
  }
`;

const BorderWrapper = styled.div`
  padding-left: 40px;
  border-left: solid;

  ${MediaQueries.small} {
    border: none;
  }
`;

const toCheckoutPage = id => {
  let mq = window.matchMedia(MediaQueries.small.replace('@media ', ''));
  return push(`${id}/checkout${mq.matches ? '-mobile' : '/contact-info'}`);
};

function TripInfo(props) {
  const pickupString = moment
    .utc(props.time.pickupStart)
    .format(DAY_MONTH_DATE_TIME);
  const soldOut = props.capacity === props.ticketsSold;
  return (
    <Wrapper>
      <BorderWrapper>
        <P proxima bold uppercase color="green">
          Date
        </P>
        <P proxima>{pickupString}</P>
        <P proxima bold uppercase color="green">
          location
        </P>
        <P proxima>{props.location}</P>
        <P proxima bold uppercase color="green">
          difficulty
        </P>
        <P proxima capitalize>
          {props.difficulty}
        </P>
        <P proxima bold uppercase color="green">
          price
        </P>
        <P proxima>${props.pricing.min} per person</P>
        <P proxima bold uppercase color="green">
          availibility
        </P>
        <P proxima>
          {props.capacity - props.ticketsSold}/{props.capacity} Tickets
          remaining
        </P>
        {soldOut ? (
          <P proxima>
            Tickets for this trip may open up. Please check back later.
          </P>
        ) : (
          <BookButton primary onClick={() => props.toCheckout(props.tripId)}>
            Book Trip
          </BookButton>
        )}
      </BorderWrapper>
    </Wrapper>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toCheckout: toCheckoutPage,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripInfo);
