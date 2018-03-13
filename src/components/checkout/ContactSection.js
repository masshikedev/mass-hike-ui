import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H2, H6, Input, Button } from '../../style';
import { validate } from 'validate.js';
import { contactConstraints } from '../../utils/validationConstraints';
import ValidatedTextInput from '../forms/ValidatedTextInput';
import formatPhoneNumber from '../../utils/phoneFormatter';

class ContactSection extends Component {
  constructor(props) {
    super(props);
    const { name, email, phone, preferredContactMethods } = props;
    this.state = {
      name,
      email,
      phone,
      preferredContactMethods,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    const { name, email, phone, preferredContactMethods } = this.state;
    const messages = validate(this.state, contactConstraints()) || 'valid';
    return (
      <div>
        <H2>Enter your contact information</H2>

        <ValidatedTextInput
          title="Name"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          error={messages['name']}
        />
        <ValidatedTextInput
          title="Email"
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          error={messages['email']}
        />
        <ValidatedTextInput
          title="Phone"
          value={phone}
          onChange={e =>
            this.setState({ phone: formatPhoneNumber(e.target.value) })
          }
          error={messages['phone']}
          placeholder="(000) 000 - 0000"
        />
        <H6>How should we contact you?</H6>
        <label>
          Email
          <Input
            type="checkbox"
            checked={preferredContactMethods.includes('email')}
            onChange={e =>
              this.setState({
                preferredContactMethods: e.target.checked
                  ? preferredContactMethods.concat('email')
                  : preferredContactMethods.filter(i => i !== 'email'),
              })
            }
          />
        </label>
        <label>
          Text Message
          <Input
            type="checkbox"
            checked={preferredContactMethods.includes('phone')}
            onChange={e =>
              this.setState({
                preferredContactMethods: e.target.checked
                  ? preferredContactMethods.concat('phone')
                  : preferredContactMethods.filter(i => i !== 'phone'),
              })
            }
          />
        </label>
        <br />

        {messages === 'valid' && (
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
  preferredContactMethods: state.checkout.preferredContactMethods,
});

export default connect(mapStateToProps)(ContactSection);
