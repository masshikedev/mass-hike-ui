import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedTextInput from '../../forms/ValidatedTextInput';
import formatPhoneNumber from '../../../utils/phoneFormatter';
import { validate } from 'validate.js';
import { memberConstraints } from '../../../utils/validationConstraints';
import { Button, P } from '../../../style';
import { RequestStatus } from '../../../constants';

const newMember = {
  name: '',
  email: '',
  phone: '',
  classification: '',
};

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.member || newMember;
  }

  isFormComplete(messages) {
    return (
      messages === 'valid' ||
      (!messages.name && !(messages.phone && messages.email))
    );
  }

  attributes(messages) {
    const { name, email, phone, classification } = this.state;
    return {
      name,
      email: !messages.email && email,
      phone: !messages.phone && phone,
      classification,
    };
  }

  onClickSubmit = attributes => {
    const { onSubmit } = this.props;
    onSubmit(attributes);
  };

  render() {
    const messages = validate(this.state, memberConstraints()) || 'valid';
    const { name, email, phone, classification } = this.state;
    const { buttonText, onSubmit, status } = this.props;
    return (
      <div>
        <ValidatedTextInput
          title="Name"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          error={messages.name}
        />
        <ValidatedTextInput
          title="Email"
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          error={messages.email}
        />
        <ValidatedTextInput
          title="Phone"
          value={phone || ''}
          onChange={e =>
            this.setState({ phone: formatPhoneNumber(e.target.value) })
          }
          error={messages.phone}
        />
        <ValidatedTextInput
          title="Classification"
          value={classification || ''}
          onChange={e => this.setState({ classification: e.target.value })}
        />
        {this.isFormComplete(messages) && (
          <Button
            onClick={e => {
              e.preventDefault();
              this.onClickSubmit(this.attributes(messages));
            }}
          >
            {buttonText}
          </Button>
        )}
        {status === RequestStatus.ERROR && (
          <P color="error">An error has occured.</P>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.members.createMemberStatus,
});

export default connect(mapStateToProps)(MemberForm);
