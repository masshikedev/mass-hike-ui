import React, { Component } from 'react';
import { P, H6, GridParent } from '../../style';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OrderGridWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const OrderGridRow = GridParent.extend`
  font-size: 16px;
`;

const Column = styled.div`
  grid-column: span 2;
  padding-bottom: 20px;
`;

class OrderGrid extends Component {
  totalSales() {
    const { orders } = this.props;
    return orders
      .map(order => order.tickets)
      .reduce((acc, current) => acc + current);
  }

  renderOrders() {
    const { orders, capacity } = this.props;
    return orders.map((order, i) => {
      return (
        <OrderGridRow key={i}>
          <Column>{order.name}</Column>
          <Column>{order.tickets}</Column>
          <Column>0</Column>
          <Column>{order.promoCode || 'none'}</Column>
          <Column>{order.selectedPrice * order.tickets}</Column>
          <Column>
            <Link to="/">details</Link>
          </Column>
        </OrderGridRow>
      );
    });
  }

  render() {
    const { orders } = this.props;
    if (orders.length === 0) {
      return <P>No tickets purchased yet</P>;
    }
    return (
      <OrderGridWrapper>
        <OrderGridRow>
          <Column>
            <H6>Customer</H6>
          </Column>
          <Column>
            <H6>Tickets</H6>
          </Column>
          <Column>
            <H6>Children</H6>
          </Column>
          <Column>
            <H6>Promo</H6>
          </Column>
          <Column>
            <H6>Revenue</H6>
          </Column>
          <Column />
        </OrderGridRow>
        {this.renderOrders()}
        <OrderGridRow>
          <Column>
            <P bold>Total</P>
          </Column>
          <Column>
            <P bold>{this.totalSales()}</P>
          </Column>
        </OrderGridRow>
      </OrderGridWrapper>
    );
  }
}

export default OrderGrid;
