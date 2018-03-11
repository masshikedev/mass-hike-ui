import React from 'react';
import OrderSummary from '../components/OrderSummary';
import orders from '../data/orders.js';
import { P, H2, MediaQueries, Container, GridParent } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

function OrderConfirmation(props) {
  const id = props.match.params.id;
  return (
    <Container>
      <GridParent>
        <Wrapper>
          <H2>You're going!</H2>
          <P small>
            We’re so excited that you want to take a hike with us! Until then,
            take a look at our suggested packing list and our FAQs. We’ll see
            you soon!
          </P>
          <OrderSummary order={orders[id]} />
        </Wrapper>
      </GridParent>
    </Container>
  );
}

export default OrderConfirmation;
