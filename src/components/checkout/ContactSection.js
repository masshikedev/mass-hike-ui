import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import { H2, H6 } from '../../style';
import { validate } from 'validate.js';
import { contactConstraints } from '../../utils/validationConstraints';
import {
  ValidatedTextInput,
  NextButton,
  ButtonSpacer,
  CheckBoxWrapper,
} from '../forms';
import Checkbox from '../forms/Checkbox';
import formatPhoneNumber from '../../utils/phoneFormatter';
import styled from 'styled-components';
import { MediaQueries } from '../../style';

const Contact = styled.div`
  margin-top: 30px;
`;

class ContactSection extends BaseCheckoutSection {
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
    const { name, email, phone, preferredContactMethods } = this.state;
    const messages =
      validate(this.state, contactConstraints(this.state)) || 'valid';
    return (
      <div>
        <H2>Contact Information</H2>

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
        <Contact>
          <H6>How should we contact you?</H6>
          <CheckBoxWrapper>
            <Checkbox
              text="Email"
              checked={preferredContactMethods.includes('email')}
              onChange={e =>
                this.setState({
                  preferredContactMethods: e.target.checked
                    ? preferredContactMethods.concat('email')
                    : preferredContactMethods.filter(i => i !== 'email'),
                })
              }
            />
            <Checkbox
              text="Text Message"
              checked={preferredContactMethods.includes('phone')}
              onChange={e =>
                this.setState({
                  preferredContactMethods: e.target.checked
                    ? preferredContactMethods.concat('phone')
                    : preferredContactMethods.filter(i => i !== 'phone'),
                })
              }
            />
          </CheckBoxWrapper>
        </Contact>

        <ButtonSpacer>
          <NextButton
            onClick={this.onCompleteSection}
            active={messages === 'valid'}
            hideOnMobile={!this.onFurthestSection()}
          />
        </ButtonSpacer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.checkout.name,
  email: state.checkout.email,
  phone: state.checkout.phone,
  preferredContactMethods: state.checkout.preferredContactMethods,
  highestCompletedSection: state.checkout.highestCompletedSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactSection);
