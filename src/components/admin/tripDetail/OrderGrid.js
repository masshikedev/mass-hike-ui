import React, { Component } from 'react';
import { P, Table, Tr, Th, Td } from '../../../style';
import { Link } from 'react-router-dom';

class OrderGrid extends Component {
  totalSales() {
    const { orders } = this.props;
    return orders
      .map(order => order.tickets)
      .reduce((acc, current) => acc + current);
  }

  totalRevenue() {
    const { orders } = this.props;
    return orders
      .map(order => order.tickets * order.selectedPrice)
      .reduce((acc, current) => acc + current);
  }

  renderOrders() {
    const { orders } = this.props;
    return orders.map((order, i) => {
      return (
        <Tr key={i}>
          <Td>
            <Link to={`/admin/orders/${order._id}`}>{order.name}</Link>
          </Td>
          <Td>{order.tickets}</Td>
          <Td>0</Td>
          <Td>{order.promoCode || 'none'}</Td>
          <Td>{order.selectedPrice * order.tickets}</Td>
          <Td>
            {order.memberId && (
              <Link to={`/admin/members/${order.memberId}`}>details</Link>
            )}
          </Td>
        </Tr>
      );
    });
  }

  render() {
    const { orders, cancelled } = this.props;
    if (orders.length === 0) {
      return <P>No tickets purchased yet</P>;
    }
    return (
      <Table fixed>
        <thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Tickets</Th>
            <Th>Children</Th>
            <Th>Promo</Th>
            <Th>Revenue</Th>
            <Th>Member?</Th>
          </Tr>
        </thead>
        <tbody>
          {this.renderOrders()}
          {!cancelled && (
            <Tr totals>
              <Td>Total</Td>
              <Td>{this.totalSales()}</Td>
              <Td />
              <Td />
              <Td>{this.totalRevenue()}</Td>
            </Tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default OrderGrid;
