import React, { Component } from 'react';
import { GridParent, H6, Button } from '../../style';
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

const PricingOptionsRow = GridParent.extend`
  font-size: 16px;
`;

const DeleteButton = Button.extend`
  width: 100%;
  height: 32px;
  font-size: 16px;
`;

class PromoCodeGrid extends Component {
  constructor(props) {
    super(props);
  }

  renderPricingOptions() {
    const { options } = this.props;
    for (const code in options) {
      return (
        <PricingOptionsRow>
          <ColumnLarge>{code}</ColumnLarge>
          <ColumnSmall>{`$${options[code]['min']}`}</ColumnSmall>
          <ColumnSmall>{`$${options[code]['max']}`}</ColumnSmall>
          <ColumnLarge>{`$${options[code]['suggestion1']}, $${
            options[code]['suggestion2']
          }, $${options[code]['suggestion3']}`}</ColumnLarge>
          <ButtonColumn>
            <DeleteButton>delete</DeleteButton>
          </ButtonColumn>
        </PricingOptionsRow>
      );
    }
  }

  render() {
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
        {this.renderPricingOptions()}
      </div>
    );
  }
}

export default PromoCodeGrid;
