import React, { Component } from 'react';
import { GridParent, P, H6, Button } from '../../style';
import styled from 'styled-components';

const ColumnLarge = styled.div`
  grid-column: span 3;
  padding: 10px 0;
`;

const ColumnSmall = styled.div`
  grid-column: span 2;
  padding: 10px 0;
`;

const ButtonColumn = ColumnSmall.extend`
  padding: 0;
`;

const PricingcodesRow = GridParent.extend`
  font-size: 16px;
`;

const DeleteButton = Button.extend`
  width: 100%;
  height: 32px;
  font-size: 16px;
`;

class PromoCodeGrid extends Component {
  renderPricingcodes() {
    const { codes, onDelete } = this.props;
    return codes.map((code, i) => {
      return (
        <PricingcodesRow key={i}>
          <ColumnLarge>{code.promoCode}</ColumnLarge>
          <ColumnSmall>{`$${code.min}`}</ColumnSmall>
          <ColumnSmall>{`$${code.max}`}</ColumnSmall>
          <ColumnLarge>{`$${code.suggestion1}, $${code.suggestion2}, $${
            code.suggestion3
          }`}</ColumnLarge>
          <ButtonColumn>
            <DeleteButton
              onClick={e => {
                e.preventDefault();
                onDelete(i);
              }}
            >
              delete
            </DeleteButton>
          </ButtonColumn>
        </PricingcodesRow>
      );
    });
  }

  render() {
    const { codes } = this.props;
    if (codes.length === 0) {
      return <P>No promo codes set for this trip</P>;
    }
    return (
      <div>
        <GridParent>
          <ColumnLarge>
            <H6>Promo Code</H6>
          </ColumnLarge>
          <ColumnSmall>
            <H6>Min Price</H6>
          </ColumnSmall>
          <ColumnSmall>
            <H6>Max Price</H6>
          </ColumnSmall>
          <ColumnLarge>
            <H6>Suggestions</H6>
          </ColumnLarge>
          <ColumnSmall />
        </GridParent>
        {this.renderPricingcodes()}
      </div>
    );
  }
}

export default PromoCodeGrid;
