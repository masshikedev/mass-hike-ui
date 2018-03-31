import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import { setCurrentSection } from '../../../actions/CheckoutActions';
import { H3, H6, Input, Button } from '../../../style';

class CardPayment extends BaseCheckoutSection {
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
    return (
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

        {true && <Button onClick={this.onCompleteSection}>Next</Button>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
