import React, { Component } from 'react';
import { H6, Input, GridParent } from '../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
`;

class PricingForm extends Component {
  constructor(props) {
    super(props);
    if (props.pricing) {
      this.state = props.pricing;
    } else {
      this.state = {
        min: 0,
        max: 0,
        option1: 0,
        option2: 0,
        option3: 0,
      };
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

  render() {
    const { showPromo } = this.props;
    return (
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
          {showPromo && (
            <div>
              <H6>Promo Code</H6>
              <Input type="text" />
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
    );
  }
}

export default PricingForm;
