import React, { Component } from 'react';
import emptyTrip from '../../data/emptyTrip';
import { GridParent, Button } from '../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
  font-size: 16px;
  padding: 10px 0;
`;

const ZipColumn = styled.div`
  grid-column: span 4;
  font-weight: bold;
  padding-top: 2px;
`;

const DeleteColumn = styled.div`
  grid-column: span 8;
`;

const DeleteButton = Button.extend`
  background-color: transparent;
  text-decoration: underline;
  border: none;
  color: #000000;
  font-size: 16px;
  height: 16px;
  padding: 0;
  width: auto;
`;

class ZipcodeList extends Component {
  render() {
    const { zipcodes, onDelete } = this.props;
    return (
      <GridParent>
        {zipcodes.map((zipcode, i) => {
          return (
            <Column key={i}>
              <GridParent>
                <ZipColumn>{zipcode}</ZipColumn>
                <DeleteColumn>
                  <DeleteButton
                    onClick={e => {
                      e.preventDefault();
                      onDelete(i);
                    }}
                  >
                    delete
                  </DeleteButton>
                </DeleteColumn>
              </GridParent>
            </Column>
          );
        })}
      </GridParent>
    );
  }
}

export default ZipcodeList;
