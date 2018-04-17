import React, { Component } from 'react';
import { P, Table, Tr, Th, Td } from '../../../style';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
        <Tr key={i}>
          <Td>{order.name}</Td>
          <Td>{order.tickets}</Td>
          <Td>0</Td>
          <Td>{order.promoCode || 'none'}</Td>
          <Td>{order.selectedPrice * order.tickets}</Td>
          <Td>
            <Link to="/">details</Link>
          </Td>
        </Tr>
      );
    });
  }

  render() {
    const { orders } = this.props;
    if (orders.length === 0) {
      return <P>No tickets purchased yet</P>;
    }
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Tickets</Th>
            <Th>Children</Th>
            <Th>Promo</Th>
            <Th>Revenue</Th>
          </Tr>
        </thead>
        <tbody>
          {this.renderOrders()}
          <Tr totals>
            <Td>Total</Td>
            <Td>{this.totalSales()}</Td>
          </Tr>
        </tbody>
      </Table>
    );
  }
}

export default OrderGrid;
