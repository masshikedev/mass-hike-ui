import React, { Component } from 'react';
import { P, H6, GridParent, Table, Tr, Th, Td } from '../../../style';
import styled from 'styled-components';

const Row = Tr.extend`
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;

class PickupGrid extends Component {
  preferredContact(order) {
    if (order.preferredContactMethods.includes('email')) {
      return order.email;
    }
    return order.phone;
  }

  renderCustomers() {
    const { orders, onClickOrder } = this.props;
    return orders.map((order, i) => {
      return (
        <Row key={i} onClick={() => onClickOrder(i)}>
          <Td>{order.name}</Td>
          <Td>{order.pickupLocation}</Td>
          <Td>{this.preferredContact(order)}</Td>
        </Row>
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
            <Th>Address</Th>
            <Th>Contact</Th>
          </Tr>
        </thead>
        <tbody>{this.renderCustomers()}</tbody>
      </Table>
    );
  }
}

export default PickupGrid;
