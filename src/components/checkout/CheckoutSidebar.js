import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SectionOrder from '../../data/CheckoutSectionOrder';
import { P, H2, H6, Button, constants, MediaQueries } from '../../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR, TIME } from '../../utils/dateFormats';

const Wrapper = styled.div`
  color: white;
  background: ${constants.lightgreenBg};
  background-blend-mode: multiply;
  grid-column: span 4;
  padding: 15%;
  ${MediaQueries.small} {
    display: none;
    grid-column: 0;
  }
`;

class CheckoutSidebar extends Component {
  render() {
    const {
      trip,
      tickets,
      price,
      highestCompletedSection,
      toCheckout,
    } = this.props;
    return (
      <Wrapper>
        <H2>Summary</H2>
        <P color="white" size="large" proxima extrabold spaced>
          Trip Details
        </P>
        <P proxima medium color="white">
          {trip.name}
          <br />
          {moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}
          <br />
          {moment(trip.time.hikeStart).format(TIME)}
          <br />
        </P>
        {tickets !== '' && (
          <div>
            {price ? (
              <div>
                <P proxima color="white">{`${tickets} ${
                  tickets > 1 ? `tickets` : `ticket`
                } x $${price} each`}</P>
                <H6>Total</H6>
                <P proxima color="white" capitalize>{`$${tickets * price}`}</P>
              </div>
            ) : (
              <P proxima color="white">{`${tickets} ${
                tickets > 1 ? `tickets` : `ticket`
              }`}</P>
            )}
          </div>
        )}
        {highestCompletedSection === SectionOrder.length - 1 && (
          <Button onClick={() => toCheckout(trip)}>Check out</Button>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  price: state.checkout.price,
  highestCompletedSection: state.checkout.highestCompletedSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toCheckout: trip => push(`/trips/${trip.tripId}/checkout/confirmation`),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSidebar);
