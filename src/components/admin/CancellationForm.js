import React, { Component } from 'react';
import { H5, P, Input, Button } from '../../style';

const CancelInput = Input.extend`
  margin-bottom: 20px;
`;

class CancellationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onClick = e => {
    e.preventDefault();
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { text } = this.state;
    const { type } = this.props;
    return (
      <div>
        <H5>Cancellation</H5>
        <P>
          Confirm you want to cancel this {type} by typing "cancel" in the text
          box.
        </P>
        <CancelInput
          type="text"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <br />
        {text.toLowerCase() === 'cancel' && (
          <Button color="red" onClick={this.onClick}>
            Cancel {type}
          </Button>
        )}
      </div>
    );
  }
}

export default CancellationForm;
