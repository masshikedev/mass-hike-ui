import React, { Component } from 'react';
import { P, GridParent, Button } from '../../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 6;
  font-size: 16px;
  padding: 10px 0;
`;

const ZipColumn = styled.div`
  grid-column: span 8;
  font-weight: ${props => (props.bold ? 700 : 400)};
  padding-top: 2px;
`;

const ZipcodeText = P.extend`
  margin-bottom: 0;
`;

const DeleteColumn = styled.div`
  grid-column: span 4;
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
  concatLocation(location) {
    const stop = location.indexOf(', MA');
    return location.substring(0, stop);
  }

  render() {
    const { zipcodes, onDelete, showDelete } = this.props;
    return (
      <GridParent>
        {zipcodes.map((zipcode, i) => {
          return (
            <Column key={i}>
              <GridParent>
                <ZipColumn bold={showDelete}>
                  <ZipcodeText bold>{zipcode.zipcode}</ZipcodeText>
                  <P>{this.concatLocation(zipcode.location)}</P>
                </ZipColumn>
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
