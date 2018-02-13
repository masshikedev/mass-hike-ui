import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContactSection extends Component {
  constructor(props) {
    super(props);
    const { name, email, phone, preferredContactMethod } = props;
    this.state = {
      name,
      email,
      phone,
      preferredContactMethod,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    const { name, email, phone, preferredContactMethod } = this.state;
    return (
      <div>
        <h3>Enter your contact information</h3>
        <label>
          <h6>Name</h6>
          <input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <label>
          <h6>Email</h6>
          <input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </label>
        <label>
          <h6>Phone</h6>
          <input
            type="text"
            value={phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />
        </label>
        <h6>How should we contact you?</h6>
        <label>
          Email
          <input
            type="radio"
            checked={preferredContactMethod === 'email'}
            onChange={() => this.setState({ preferredContactMethod: 'email' })}
          />
        </label>
        <label>
          Phone
          <input
            type="radio"
            checked={preferredContactMethod !== 'email'}
            onChange={() => this.setState({ preferredContactMethod: 'phone' })}
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
  name: state.checkout.name,
  email: state.checkout.email,
  phone: state.checkout.phone,
  preferredContactMethod: state.checkout.preferredContactMethod,
});

export default connect(mapStateToProps)(ContactSection);
