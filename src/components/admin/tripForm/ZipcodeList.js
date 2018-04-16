import React, { Component } from 'react';
import { GridParent, Button } from '../../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
  font-size: 16px;
  padding: 10px 0;
`;

const ZipColumn = styled.div`
  grid-column: span 4;
  font-weight: ${props => (props.bold ? 700 : 400)};
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
    const { zipcodes, onDelete, showDelete } = this.props;
    return (
      <GridParent>
        {zipcodes.map((zipcode, i) => {
          return (
            <Column key={i}>
              <GridParent>
                <ZipColumn bold={showDelete}>{zipcode}</ZipColumn>
                <DeleteColumn>
                  {showDelete && (
                    <DeleteButton
                      onClick={e => {
                        e.preventDefault();
                        onDelete(i);
                      }}
                    >
                      delete
                    </DeleteButton>
                  )}
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
