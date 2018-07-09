import React from 'react';
import { P, H4, H6, MediaQueries, constants } from '../../style';
import styled from 'styled-components';

const Summary = styled.div`
  margin-top: 50px;
`;

const Content = styled.div`
  padding-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  grid-column: span 1;
  ${MediaQueries.small} {
    grid-column: span 2;
  }
`;

function DonationSummary(props) {
  const { donation } = props;
  return (
    <Summary>
      <H4>Donation Summary</H4>
      <Content>
        <Column>
          <H6 color={constants.green}>Payment</H6>
          <P proxima>
            {donation.cardType} {donation.cardNumber}
          </P>
        </Column>
        <Column>
          <H6 color={constants.green}>Amount</H6>
          <P proxima>{`$${donation.amount.toFixed(2)}`}</P>
        </Column>
      </Content>
    </Summary>
  );
}

export default DonationSummary;
