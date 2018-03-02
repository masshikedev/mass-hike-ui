import React, { Component } from 'react';
import { P, H6, Input } from '../../style';
import styled from 'styled-components';

class ValidatedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { init: true };
  }

  render() {
    const { title, onChange, error, value } = this.props;
    const { init } = this.state;
    const transform = this.props.transform || (v => v);
    const placeholder = this.props.placeholder || '';
    return (
      <label>
        <H6>{title}</H6>
        <Input
          type="text"
          placeholder={placeholder}
          value={transform(value)}
          onChange={e => {
            onChange(e);
          }}
          onBlur={e => {
            this.setState({ init: false });
          }}
          invalid={!init ? error : false}
        />
        {!init && error ? (
          <P small error>
            {error[0]}
          </P>
        ) : null}
      </label>
    );
  }
}

export default ValidatedTextInput;
