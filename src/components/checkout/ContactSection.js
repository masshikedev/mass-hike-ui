import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H2, H6, Input, Button } from '../../style';

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
            type="checkbox"
            checked={preferredContactMethods.includes('email')}
            onChange={e =>
              this.setState({
                preferredContactMethods: e.target.checked
                  ? preferredContactMethods.concat('email')
                  : preferredContactMethods.filter(i => i != 'email'),
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
                  : preferredContactMethods.filter(i => i != 'phone'),
              })
            }
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
  preferredContactMethods: state.checkout.preferredContactMethods,
});

export default connect(mapStateToProps)(ContactSection);
