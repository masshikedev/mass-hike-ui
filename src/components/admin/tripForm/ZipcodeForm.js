import React, { Component } from 'react';
import { P, GridParent, Input, Button, H6 } from '../../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
`;

const ZipcodeFormContainer = GridParent.extend`
  margin-top: 20px;
`;

class ZipcodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZipcode: '',
      validationError: '',
    };
  }

  onClickAdd = e => {
    e.preventDefault();
    const { currentZipcode } = this.state;
    const { onAddZipcode } = this.props;
    if (!isNaN(currentZipcode) && currentZipcode.length === 5) {
      onAddZipcode(currentZipcode);
      this.setState({ currentZipcode: '', validationError: '' });
    } else {
      this.setState({ validationError: 'Invalid Zipcode' });
    }
  };

  render() {
    const { error } = this.props;
    const { currentZipcode, validationError } = this.state;
    return (
      <div>
        <ZipcodeFormContainer>
          <Column>
            <H6>Zipcode</H6>
            <Input
              type="text"
              value={currentZipcode}
              onChange={e => this.setState({ currentZipcode: e.target.value })}
            />
          </Column>
          <Column>
            <Button onClick={this.onClickAdd}>Add zipcode</Button>
          </Column>
        </ZipcodeFormContainer>
        {error && <P error>{error}</P>}
        {validationError && <P error>{validationError}</P>}
      </div>
    );
  }
}

export default ZipcodeForm;
