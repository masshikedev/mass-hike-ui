import React from 'react';
import trips from '../data/trips';
import OrderSummary from '../components/OrderSummary';
import orders from '../data/orders.js';
import { H2 } from '../style';

function OrderConfirmation(props) {
  const id = props.match.params.id;
  return (
    <div>
      <H2>You're going!</H2>
      <OrderSummary {...orders[id]} />
    </div>
  );
}

export default OrderConfirmation;
