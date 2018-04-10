import React, { Component } from 'react';
import { H6, GridParent } from '../../style';
import styled from 'styled-components';

const PickupGridWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const PickupGridRow = GridParent.extend`
  font-size: 16px;
`;

const Column = styled.div`
  grid-column: span 4;
  padding-bottom: 20px;
`;

class PickupGrid extends Component {
  preferredContact(order) {
    if (order.preferredContactMethods.includes('email')) {
      return order.email;
    }
    return order.phone;
  }

  renderCustomers() {
    const { orders } = this.props;
    return orders.map((order, i) => {
      return (
        <PickupGridRow>
          <Column>{order.name}</Column>
          <Column>{order.pickupLocation}</Column>
          <Column>{this.preferredContact(order)}</Column>
        </PickupGridRow>
      );
    });
  }

  render() {
    return (
      <PickupGridWrapper>
        <PickupGridRow>
          <Column>
            <H6>Customer</H6>
          </Column>
          <Column>
            <H6>Address</H6>
          </Column>
          <Column>
            <H6>Contact</H6>
          </Column>
        </PickupGridRow>
        {this.renderCustomers()}
      </PickupGridWrapper>
    );
  }
}

export default PickupGrid;
