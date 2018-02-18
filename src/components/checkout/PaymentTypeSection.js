import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <h3>Enter a promo code. (Optional)</h3>
        <input
          type="text"
          value={this.state.promoCode}
          onChange={e => this.setState({ promoCode: e.target.value })}
        />
        <h6>How would you like to pay?</h6>
        <label>
          Credit/Debit
          <input
            type="radio"
            checked={paymentType === 'card'}
            onChange={() => this.setState({ paymentType: 'card' })}
          />
        </label>
        <label>
          Cash
          <input
            type="radio"
            checked={paymentType === 'cash'}
            onChange={() => this.setState({ paymentType: 'cash' })}
          />
        </label>
        {(showNextButton(this.state) || paymentType === 'cash') && (
          <button onClick={() => onClickNextButton(this.state)}>Next</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  promoCode: state.checkout.promoCode,
  paymentType: state.checkout.paymentType,
});

export default connect(mapStateToProps)(PaymentTypeSection);
