import React, { Component } from 'react';
import { P, H6, Input } from '../../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Text = styled.span`
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 400;
  color: black;
  margin-right: 20px;
`;

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
  }

  render() {
    const { onChange, checked, id, type } = this.props;
    const { editing } = this.state;
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
