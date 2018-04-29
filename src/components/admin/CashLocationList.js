import React, { Component } from 'react';
import { GridParent, Button, P, H3, H5, H6, Input } from '../../style';
import styled from 'styled-components';

const LocationGrid = GridParent.extend`
  margin-bottom: 30px;
`;

const GridColumn = styled.div`
  grid-column: span 6;
  padding: 5px 0;
`;

const LocationColumn = styled.div`
  grid-column: span 8;
`;

const DeleteColumn = styled.div`
  padding-top: 5px;
  grid-column: span 4;
`;

const FormColumn = styled.div`
  grid-column: span 5;
`;
const AddColumn = styled.div`
  grid-column: span 2;
`;

const DeleteButton = Button.extend`
  background-color: transparent;
  text-decoration: underline;
  border: none;
  color: ${props => (props.markedToDelete ? '#C13F54' : '#000000')};
  font-size: 16px;
  height: 16px;
  padding: 0;
  width: auto;
`;

const AddButton = Button.extend`
  background-color: transparent;
  text-decoration: underline;
  border: none;
  color: #000000;
  padding-top: 25px;
`;

const ConfirmButton = Button.extend`
  margin-top: 15px;
`;

const LocationInput = Input.extend`
  margin-bottom: 10px;
`;

const LocationName = P.extend`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
`;

const NEIGHBORHOOD_FILTERS = [
  { name: 'Allston', filter: ', allston' },
  { name: 'Brighton', filter: ', brighton' },
  { name: 'Brookline', filter: ', brookline' },
  { name: 'Cambridge', filter: ', cambridge' },
  { name: 'Charlestown', filter: ', charlestown' },
  { name: 'Dorchester', filter: ', dorchester' },
  { name: 'East Boston', filter: ', east boston' },
  { name: 'Hyde Park', filter: ', hyde park' },
  { name: 'Jamaica Plain', filter: ', jamaica plain' },
  { name: 'Mattapan', filter: ', mattapan' },
  { name: 'Roslindale', filter: ', roslindale' },
  { name: 'Roxbury & Mission Hill', filter: ', roxbury' },
  { name: 'Somerville', filter: ', somerville' },
  { name: 'South Boston', filter: ', south boston' },
  { name: 'West Roxbury', filter: ', west roxbury' },
  { name: 'Other Boston Locations', filter: ', boston' },
];

class CashLocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.indexLocations(props.locations),
      toDelete: [],
      newLocations: [],
      newLocationName: '',
      newLocationAddress: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      locations: this.indexLocations(nextProps.locations),
    });
  }

  indexLocations(locations) {
    return locations.map((location, i) => {
      location.index = i;
      return location;
    });
  }

  filterByNeighborhood(filter) {
    const { locations } = this.state;
    return locations.filter(location => {
      return location.address.toLowerCase().includes(filter);
    });
  }

  remainingLocations() {
    const { locations } = this.state;
    return locations.filter(location => {
      for (let i = 0; i < NEIGHBORHOOD_FILTERS.length; i++) {
        if (
          location.address
            .toLowerCase()
            .includes(NEIGHBORHOOD_FILTERS[i].filter)
        ) {
          return false;
        }
      }
      return true;
    });
  }

  onClickConfirm = () => {
    const { locations, onConfirm } = this.props;
    const { toDelete, newLocations } = this.state;
    if (newLocations.length === 0 && toDelete.length === 0) {
      return null;
    }
    const deleteIndices = toDelete.sort();
    deleteIndices.forEach((deleteIndex, i) => {
      locations.splice(deleteIndex - i, 1);
    });
    newLocations.forEach(location => {
      locations.push(location);
    });
    onConfirm(locations);
    this.setState({
      toDelete: [],
      newLocations: [],
      newLocationName: '',
      newLocationAddress: '',
    });
  };

  onClickDelete = index => {
    const { toDelete } = this.state;
    if (toDelete.includes(index)) {
      toDelete.splice(toDelete.indexOf(index), 1);
    } else {
      toDelete.push(index);
    }
    this.setState({ toDelete });
  };

  onClickAdd = () => {
    const { newLocations, newLocationName, newLocationAddress } = this.state;
    newLocations.push({ name: newLocationName, address: newLocationAddress });
    this.setState({
      newLocations,
      newLocationName: '',
      newLocationAddress: '',
    });
  };

  onRemoveNew = index => {
    const { newLocations } = this.state;
    newLocations.splice(index, 1);
    this.setState(newLocations);
  };

  renderDeleteColumn(location, markedToDelete, isNew) {
    if (isNew) {
      return (
        <DeleteColumn>
          <DeleteButton
            markedToDelete={false}
            onClick={e => {
              this.onRemoveNew(location.index);
            }}
          >
            remove
          </DeleteButton>
        </DeleteColumn>
      );
    }
    return (
      <DeleteColumn>
        <DeleteButton
          markedToDelete={markedToDelete}
          onClick={e => {
            this.onClickDelete(location.index);
          }}
        >
          {markedToDelete ? 'keep' : 'delete'}
        </DeleteButton>
      </DeleteColumn>
    );
  }

  renderLocation(location, isNew) {
    const { toDelete } = this.state;
    const markedToDelete = toDelete.includes(location.index);
    return (
      <GridParent>
        <LocationColumn>
          <LocationName color={markedToDelete ? 'error' : null}>
            {location.name}
          </LocationName>
          <P size="small" color={markedToDelete ? 'error' : null}>
            {location.address}
          </P>
        </LocationColumn>
        {this.renderDeleteColumn(location, markedToDelete, isNew)}
      </GridParent>
    );
  }

  renderLocationList(locations, isNew) {
    return (
      <div>
        <LocationGrid>
          {locations.map(location => {
            return (
              <GridColumn key={location.index}>
                {this.renderLocation(location, isNew)}
              </GridColumn>
            );
          })}
        </LocationGrid>
      </div>
    );
  }

  renderNeighborhood(neighborhoodData) {
    const locations = this.filterByNeighborhood(neighborhoodData.filter);
    if (locations.length === 0) {
      return null;
    }
    return (
      <div key={neighborhoodData.name}>
        <H5>{neighborhoodData.name}</H5>
        {this.renderLocationList(locations)}
      </div>
    );
  }

  renderRemainingLocations() {
    const locations = this.remainingLocations();
    if (locations.length === 0) {
      return null;
    }
    return (
      <div>
        <H5>Other</H5>
        {this.renderLocationList(locations)}
      </div>
    );
  }

  renderNewLocations() {
    const { newLocations } = this.state;
    return this.renderLocationList(this.indexLocations(newLocations), true);
  }

  render() {
    const { locations, onDelete, showDelete, changesSaved } = this.props;
    const {
      newLocationName,
      newLocationAddress,
      newLocations,
      toDelete,
    } = this.state;
    return (
      <div>
        {NEIGHBORHOOD_FILTERS.map(data => {
          return this.renderNeighborhood(data);
        })}
        {this.renderRemainingLocations()}
        <H3>Add New Locations</H3>
        {changesSaved &&
          newLocations.length === 0 &&
          toDelete.length === 0 && (
            <P proxima bold color="green">
              Changes saved
            </P>
          )}
        {this.renderNewLocations()}
        <GridParent>
          <FormColumn>
            <H6>Name</H6>
            <LocationInput
              type="text"
              value={newLocationName}
              onChange={e => this.setState({ newLocationName: e.target.value })}
            />
          </FormColumn>
          <FormColumn>
            <H6>Address</H6>
            <LocationInput
              type="text"
              value={newLocationAddress}
              onChange={e =>
                this.setState({ newLocationAddress: e.target.value })
              }
            />
          </FormColumn>
          <AddColumn>
            <AddButton onClick={this.onClickAdd}>Add</AddButton>
          </AddColumn>
        </GridParent>
        <br />
        <ConfirmButton
          onClick={this.onClickConfirm}
          disabled={newLocations.length === 0 && toDelete.length === 0}
        >
          Confirm Changes
        </ConfirmButton>
      </div>
    );
  }
}

export default CashLocationList;
