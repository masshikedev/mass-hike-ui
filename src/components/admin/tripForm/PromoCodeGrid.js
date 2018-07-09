import React, { Component } from 'react';
import { P, Button, Table, Tr, Th, Td } from '../../../style';

const DeleteButton = Button.extend`
  width: 50%;
  height: 32px;
  font-size: 16px;
`;

class PromoCodeGrid extends Component {
  renderPricingcodes() {
    const { codes, showDelete, onDelete } = this.props;
    return codes.map((code, i) => {
      return (
        <Tr key={i}>
          <Td>{code.promoCode}</Td>
          <Td>{`$${code.min}`}</Td>
          <Td>{`$${code.max}`}</Td>
          <Td>{`$${code.suggestion1}, $${code.suggestion2}, $${
            code.suggestion3
          }`}</Td>
          {showDelete && (
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
          )}
        </Tr>
      );
    });
  }

  render() {
    const { codes, fixed } = this.props;
    if (codes.length === 0) {
      return <P>No promo codes set for this trip</P>;
    }
    return (
      <Table fixed={fixed}>
        <thead>
          <Tr>
            <Th>Promo Code</Th>
            <Th>Min Price</Th>
            <Th>Max Price</Th>
            <Th>Suggestions</Th>
          </Tr>
        </thead>
        <tbody>{this.renderPricingcodes()}</tbody>
      </Table>
    );
  }
}

export default PromoCodeGrid;
