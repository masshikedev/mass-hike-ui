import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H2, H4, H6, constants, MediaQueries } from '../../style';
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

const SummaryP = P.extend`
  color: white;
  font-family: 'proxima-nova', 'inherit';
`;

class CheckoutSidebar extends Component {
  render() {
    const { trip, tickets, price } = this.props;
    return (
      <Wrapper>
        <H2>Summary</H2>
        <H4 color="white" size="small">
          Trip Details
        </H4>
        <SummaryP>
          {trip.name}
          <br />
          {moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}
          <br />
          {moment(trip.time.hikeStart).format(TIME)}
          <br />
        </SummaryP>
        {tickets !== '' && (
          <div>
            {price ? (
              <div>
                <SummaryP>{`${tickets} tickets x $${price} each`}</SummaryP>
                <H6>Total</H6>
                <SummaryP capitalize>{`$${tickets * price}`}</SummaryP>
              </div>
            ) : (
              <SummaryP>{`${tickets} tickets`}</SummaryP>
            )}
          </div>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  price: state.checkout.price,
});

export default connect(mapStateToProps)(CheckoutSidebar);
