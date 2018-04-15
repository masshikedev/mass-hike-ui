import React, { Component } from 'react';
import { P, Button, Table, Tr, Th, Td } from '../../style';
import styled from 'styled-components';

const DeleteButton = Button.extend`
  width: 50%;
  height: 32px;
  font-size: 16px;
`;

class PromoCodeGrid extends Component {
  renderPricingcodes() {
    const { codes, onDelete } = this.props;
    return codes.map((code, i) => {
      return (
        <Tr key={i}>
          <Td>{code.promoCode}</Td>
          <Td>{`$${code.min}`}</Td>
          <Td>{`$${code.max}`}</Td>
          <Td>{`$${code.suggestion1}, $${code.suggestion2}, $${
            code.suggestion3
          }`}</Td>
          <Td>
            <DeleteButton
              onClick={e => {
                e.preventDefault();
                onDelete(i);
              }}
            >
              delete
            </DeleteButton>
          </Td>
        </Tr>
      );
    });
  }

  render() {
    const { codes } = this.props;
    if (codes.length === 0) {
      return <P>No promo codes set for this trip</P>;
    }
    return (
      <Table>
        <Tr>
          <Th>Promo Code</Th>
          <Th>Min Price</Th>
          <Th>Max Price</Th>
          <Th>Suggestions</Th>
        </Tr>
        {this.renderPricingcodes()}
      </Table>
    );
  }
}

export default PromoCodeGrid;
