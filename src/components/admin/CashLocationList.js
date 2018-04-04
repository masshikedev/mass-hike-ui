import React, { Component } from 'react';
import { GridParent, Button, P, H6 } from '../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 6;
  padding: 10px 0;
`;

const LocationColumn = styled.div`
  grid-column: span 8;
  padding-top: 2px;
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

const LocationName = P.extend`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
`;

class CashLocationList extends Component {
  render() {
    const { locations, onDelete } = this.props;
    return (
      <div>
        <H6>Available Locations</H6>
        <GridParent>
          {locations.map((location, i) => {
            return (
              <Column key={i}>
                <GridParent>
                  <LocationColumn>
                    <LocationName>{location.name}</LocationName>
                    <P small>{location.address}</P>
                  </LocationColumn>
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
      </div>
    );
  }
}

export default CashLocationList;
