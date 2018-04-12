import React, { Component } from 'react';
import { P, H6, GridParent } from '../../style';
import styled from 'styled-components';

const PickupGridWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const HeaderRow = GridParent.extend`
  font-size: 16px;
  padding: 10px 0;
`;

const PickupGridRow = HeaderRow.extend`
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;

const Column = styled.div`
  grid-column: span 4;
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
        <PickupGridRow key={i} onClick={() => onClickOrder(i)}>
          <Column>{order.name}</Column>
          <Column>{order.pickupLocation}</Column>
          <Column>{this.preferredContact(order)}</Column>
        </PickupGridRow>
      );
    });
  }

  render() {
    const { orders } = this.props;
    if (orders.length === 0) {
      return <P>No tickets purchased yet</P>;
    }
    return (
      <PickupGridWrapper>
        <HeaderRow>
          <Column>
            <H6>Customer</H6>
          </Column>
          <Column>
            <H6>Address</H6>
          </Column>
          <Column>
            <H6>Contact</H6>
          </Column>
        </HeaderRow>
        {this.renderCustomers()}
      </PickupGridWrapper>
    );
  }
}

export default PickupGrid;
