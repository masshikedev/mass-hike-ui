import React, { Component } from 'react';
import { GridParent, Input, Button, H6 } from '../../style';
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
    };
  }
  render() {
    const { onAddZipcode } = this.props;
    const { currentZipcode } = this.state;
    return (
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
          <Button
            onClick={e => {
              e.preventDefault();
              onAddZipcode(currentZipcode);
            }}
          >
            Add zipcode
          </Button>
        </Column>
      </ZipcodeFormContainer>
    );
  }
}

export default ZipcodeForm;
