import React, { Component } from 'react';
import { P, Input, constants } from '../../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const DesktopLabel = styled.label`
  display: block;
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
`;

const DesktopCheckbox = styled.span`
  width: 20px;
  height: 20px;
  border-radius: ${props => (props.type === 'radio' ? '100%' : 0)};
  position: absolute;
  top: 3px;
  left: 0;
  background-color: ${props =>
    props.checked ? constants.green : 'transparent'};
  outline-offset: -2px;
  border: 2px solid #000;
  ${props => (props.checked ? 'box-shadow: inset 0 0 0 3px #fff' : 'none')};
`;

const MobileWrapper = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  border-radius: 5px;
  margin: 0px 5px;
`;

const MobileWrapperUnselected = MobileWrapper.extend`
  background-color: #dae2da;
  border: 2px solid #546f45;
`;

const MobileWrapperSelected = MobileWrapper.extend`
  background-color: #558959;
  border: 2px solid #558959;
`;

const Text = styled.span`
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 400;
  color: black;
  margin-right: 20px;
  margin-left: 30px;
`;
const TextMobile = P.extend`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 500;
`;

const TextMobileUnselected = TextMobile.extend`
  color: #558959;
`;

const TextMobileSelected = TextMobile.extend`
  color: white;
`;

const InputHidden = Input.extend`
  display: none;
`;

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
  }

  render() {
    const mq = window.matchMedia('(max-width: 767px)');
    const isSmall = mq.matches;
    if (isSmall) {
      return this.renderForMobile();
    } else {
      return this.renderForDesktop();
    }
  }

  renderForMobile() {
    const { onChange, checked, id, type } = this.props;
    const text = this.props.text || '';
    if (checked) {
      return (
        <MobileWrapperSelected>
          <label>
            <InputHidden
              type={type || 'checkbox'}
              id={id}
              checked={checked}
              onChange={e => {
                onChange(e);
              }}
            />
            <TextMobileSelected nobottom>{text}</TextMobileSelected>
          </label>
        </MobileWrapperSelected>
      );
    } else {
      return (
        <MobileWrapperUnselected>
          <label>
            <InputHidden
              type={type || 'checkbox'}
              id={id}
              checked={checked}
              onChange={e => {
                onChange(e);
              }}
            />
            <TextMobileUnselected nobottom>{text}</TextMobileUnselected>
          </label>
        </MobileWrapperUnselected>
      );
    }
  }

  renderForDesktop() {
    const { onChange, checked, id, type } = this.props;
    const text = this.props.text || '';
    return (
      <Wrapper>
        <DesktopLabel>
          <Input
            type={type || 'checkbox'}
            id={id}
            checked={checked}
            onChange={e => {
              onChange(e);
            }}
          />
          <DesktopCheckbox checked={checked} type={type || 'checkbox'} />
          <Text>{text}</Text>
        </DesktopLabel>
      </Wrapper>
    );
  }
}

export default Checkbox;
