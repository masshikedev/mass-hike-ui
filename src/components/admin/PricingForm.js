import React, { Component } from 'react';
import { P, H6, Input, GridParent, Button } from '../../style';
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
  error: '',
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
    const { onChange } = this.props;
    const onChangePricing = e => {
      this.setState(
        { [fieldName]: e.target.value },
        onChange ? () => onChange(this.state) : null
      );
    };
    return (
      <Input
        type="text"
        value={this.state[fieldName]}
        onChange={onChangePricing}
      />
    );
  };

  isValidPricingData = () => {
    const {
      min,
      max,
      suggestion1,
      suggestion2,
      suggestion3,
      promoCode,
    } = this.state;
    const presence =
      min && max && suggestion1 && suggestion2 && suggestion3 && promoCode;
    const order =
      +max > +min &&
      +suggestion1 >= +min &&
      +suggestion1 < +suggestion2 &&
      +suggestion2 < +suggestion3 &&
      +suggestion3 <= +max;
    return presence && order;
  };

  onClick = e => {
    e.preventDefault();
    const { onAddPromoCode } = this.props;
    const { error, ...pricingOptions } = this.state;
    if (this.isValidPricingData()) {
      onAddPromoCode(pricingOptions);
      this.setState(defaultState);
    } else {
      this.setState({
        error:
          'Invalid pricing data. Max price must be greater than base price, and suggestions must be within the range and ordered properly.',
      });
    }
  };

  renderErrors() {
    const { errors } = this.props;
    if (errors) {
      return errors.map((error, i) => {
        return (
          <P key={i} error>
            {error}
          </P>
        );
      });
    } else if (this.state.error) {
      return <P error>{this.state.error}</P>;
    }
    return null;
  }

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
        {this.renderErrors()}
        {promo && <Button onClick={this.onClick}>Add Promo Code</Button>}
      </div>
    );
  }
}

export default PricingForm;
