import React, { Component } from 'react';
import { P, H6, Input, TextArea } from '../../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

class ValidatedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
  }

  render() {
    const { title, onChange, onFocus, error, value, id, textarea } = this.props;
    const { editing } = this.state;
    const transform = this.props.transform || (v => v);
    const placeholder = this.props.placeholder || '';
    const InputComponent = textarea ? TextArea : Input;
    return (
      <Wrapper>
        <label>
          <H6>{title}</H6>
          <InputComponent
            type="text"
            id={id}
            placeholder={placeholder}
            value={transform(value)}
            onChange={e => {
              onChange(e);
            }}
            onBlur={() => {
              this.setState({ editing: false });
            }}
            onFocus={e => {
              if (onFocus) onFocus(e);
              this.setState({ editing: true });
            }}
            invalid={!editing && error}
          />
          {!editing && error ? (
            <P proxima leftmargin size="medium" color="error">
              {error[0]}
            </P>
          ) : null}
        </label>
      </Wrapper>
    );
  }
}

export default ValidatedTextInput;
