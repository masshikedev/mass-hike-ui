import React, { Component } from 'react';
import { P, H6, Input } from '../../style';

class ValidatedTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
  }

  render() {
    const { title, onChange, onFocus, error, value, id } = this.props;
    const { editing } = this.state;
    const transform = this.props.transform || (v => v);
    const placeholder = this.props.placeholder || '';
    return (
      <label>
        <H6>{title}</H6>
        <Input
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
          <P small error>
            {error[0]}
          </P>
        ) : null}
      </label>
    );
  }
}

export default ValidatedTextInput;