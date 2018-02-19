import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H2, H3, H6, Input, Button } from '../../style';
import styled from 'styled-components';

class PaymentSection extends Component {
  constructor(props) {
    super(props);
    const { cardNumber, expiration, cvv, billingZip } = props;
    this.state = {
      cardNumber,
      expiration,
      cvv,
      billingZip,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    return (
      <div>
        {this.props.paymentType === 'card' && (
          <div>
            <H3>Enter your credit card information</H3>
            <label>
              <H6>Card Number</H6>
              <Input
                type="text"
                value={this.state.cardNumber}
                onChange={e => this.setState({ cardNumber: e.target.value })}
              />
            </label>
            <label>
              <H6>Expiration</H6>
              <Input
                type="text"
                value={this.state.expiration}
                onChange={e => this.setState({ expiration: e.target.value })}
              />
            </label>
            <label>
              <H6>Security Code</H6>
              <Input
                type="text"
                value={this.state.cvv}
                onChange={e => this.setState({ cvv: e.target.value })}
              />
            </label>
            <label>
              <H6>Billing Zip</H6>
              <Input
                type="text"
                value={this.state.billingZip}
                onChange={e => this.setState({ billingZip: e.target.value })}
              />
            </label>
          </div>
        )}
        {this.props.paymentType === 'cash' && (
          <div>
            <H3>You have chosen to pay with cash</H3>
          </div>
        )}
        {(showNextButton(this.state) || this.props.paymentType === 'cash') && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

export default connect(mapStateToProps)(PaymentSection);
