import React, { Component } from 'react';
import { P, Input } from '../../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
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
        <label>
          <Input
            type={type || 'checkbox'}
            id={id}
            checked={checked}
            onChange={e => {
              onChange(e);
            }}
          />
          <Text>{text}</Text>
        </label>
      </Wrapper>
    );
  }
}

export default Checkbox;
