import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { P, Table, Tr, Th, Td } from '../../style';

class AppointmentGrid extends Component {
  renderOrder(order) {
    return (
      <Tr>
        <Td>
          <Link to={`/admin/orders/${order._id}`}>{order.name}</Link>
        </Td>
        <Td>
          {order.preferredContactMethods.includes('phone')
            ? order.phone
            : order.email}
        </Td>
        <Td>{order.meetingDate}</Td>
        <Td>{order.meetingLocation.name}</Td>
      </Tr>
    );
  }

  render() {
    const { orders } = this.props;
    if (orders.length === 0) {
      return <P>No cash appointments are scheduled at this time.</P>;
    }
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Time</Th>
            <Th>Location</Th>
            <Th />
          </Tr>
        </thead>
        <tbody>{orders.map(order => this.renderOrder(order))}</tbody>
      </Table>
    );
  }
}

export default AppointmentGrid;
