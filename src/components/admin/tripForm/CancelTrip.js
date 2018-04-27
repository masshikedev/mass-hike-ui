import React, { Component } from 'react';
import { H3, P, Input, Button } from '../../../style';

const CancelInput = Input.extend`
  margin-bottom: 20px;
`;

class CancelTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onClick = e => {
    e.preventDefault;
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <H3>Cancellation</H3>
        <P>
          Confirm you want to cancel this trip by typing "cancel" in the text
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
            Cancel trip
          </Button>
        )}
      </div>
    );
  }
}

export default CancelTrip;
