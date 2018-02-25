import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H6, MediaQueries } from '../../style';
import styled from 'styled-components';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR, TIME } from '../../utils/dateFormats';

const Wrapper = styled.div`
  grid-column: span 3;

  ${MediaQueries.small} {
    display: none;
    grid-column: 0;
  }
`;

class CheckoutSidebar extends Component {
  render() {
    const { trip, tickets, price } = this.props;
    return (
      <Wrapper>
        <H6>Trip Summary</H6>
        <P large capitalize>
          {trip.name}
          <br />
          {format(trip.time.hikeStart, MONTH_DATE_YEAR)}
          <br />
          {format(trip.time.hikeStart, TIME)}
          <br />
        </P>
        {tickets !== '' && (
          <div>
            {price ? (
              <div>
                <P large>{`${tickets} tickets x $${price} each`}</P>
                <H6>Total</H6>
                <P large capitalize>{`$${tickets * price}`}</P>
              </div>
            ) : (
              <P large capitalize>{`${tickets} tickets`}</P>
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
