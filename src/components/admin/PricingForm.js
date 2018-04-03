import React, { Component } from 'react';
import { H6, Input, GridParent, Button } from '../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
`;

const defaultState = {
  min: 0,
  max: 0,
  suggestion1: 0,
  suggestion2: 0,
  suggestion3: 0,
  promoCode: '',
};

class PricingForm extends Component {
  constructor(props) {
    super(props);
    if (props.pricing) {
      this.state = props.pricing;
    } else {
      this.state = defaultState;
    }
  }

  fieldFor = fieldName => {
    return (
      <Input
        type="text"
        value={this.state[fieldName]}
        onChange={e => this.setState({ [fieldName]: e.target.value })}
      />
    );
  };

  onClick = e => {
    e.preventDefault();
    const { onAddPromoCode } = this.props;
    onAddPromoCode(this.state);
    this.setState(defaultState);
  };

  render() {
    const { promo } = this.props;
    return (
      <div>
        <GridParent>
          <Column>
            <H6>Base Price</H6>
            {this.fieldFor('min')}
          </Column>
          <Column>
            <H6>Max Price</H6>
            {this.fieldFor('max')}
          </Column>
          <Column>
            {promo && (
              <div>
                <H6>Promo Code</H6>
                {this.fieldFor('promoCode')}
              </div>
            )}
          </Column>
          <Column>
            <H6>Suggestion 1</H6>
            {this.fieldFor('suggestion1')}
          </Column>
          <Column>
            <H6>Suggestion 2</H6>
            {this.fieldFor('suggestion2')}
          </Column>
          <Column>
            <H6>Suggestion 3</H6>
            {this.fieldFor('suggestion3')}
          </Column>
        </GridParent>
        {promo && <Button onClick={this.onClick}>Add Promo Code</Button>}
      </div>
    );
  }
}

export default PricingForm;
