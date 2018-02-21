import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H3, H6, Input } from '../../style';

class PaymentTypeSection extends Component {
  constructor(props) {
    super(props);
    const { promoCode, paymentType } = props;
    this.state = {
      promoCode,
      paymentType,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    const { paymentType } = this.state;
    return (
      <div>
        <H3>Enter a promo code. (Optional)</H3>
        <Input
          type="text"
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
        />
        <H6>How would you like to pay?</H6>
        <label>
          Credit/Debit
          <Input
            type="radio"
            checked={paymentType === 'card'}
            onChange={() => this.setState({ paymentType: 'card' })}
          />
        </label>
        <label>
          Cash
          <Input
            type="radio"
            checked={paymentType !== 'card'}
            onChange={() => this.setState({ paymentType: 'cash' })}
          />
        </label>
        {showNextButton(this.state) && (
          <button onClick={() => onClickNextButton(this.state)}>Next</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  promoCode: state.checkout.promoCode,
});

export default connect(mapStateToProps)(PaymentTypeSection);
