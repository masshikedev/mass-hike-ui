import React, { Component } from 'react';
import { connect } from 'react-redux';
import H2 from '../../style/H2';
import H6 from '../../style/H6';
import Input from '../../style/Input';
import Button from '../../style/Button';
import styled from 'styled-components';

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
        <H2>Enter your contact information</H2>
        <label>
          <H6>Name</H6>
          <Input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <label>
          <H6>Email</H6>
          <Input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </label>
        <label>
          <H6>Phone</H6>
          <Input
            type="text"
            value={phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />
        </label>
        <H6>How should we contact you?</H6>
        <label>
          Email
          <Input
            type="radio"
            checked={preferredContactMethod === 'email'}
            onChange={() => this.setState({ preferredContactMethod: 'email' })}
          />
        </label>
        <label>
          Phone
          <Input
            type="radio"
            checked={preferredContactMethod !== 'email'}
            onChange={() => this.setState({ preferredContactMethod: 'phone' })}
          />
        </label>
        <br />
        {showNextButton(this.state) && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
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
