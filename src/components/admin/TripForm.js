import React, { Component } from 'react';
import TripTimeSelector from './TripTimeSelector';
import emptyTrip from '../../data/emptyTrip';
import { H3, H6, Input, TextArea, Button, GridParent } from '../../style';
import styled from 'styled-components';

const TripFormSection = styled.div`
  margin-bottom: 30px;
`;

const Column = styled.div`
  grid-column: span 4;
`;

const TripInput = Input.extend`
  &[type='text'] {
    max-width: 400px;
  }
`;

const CalendarWrapper = styled.div`
  margin: 10px 0;
`;

class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.trip ? props.trip : emptyTrip;
  }

  fieldFor = (fieldName, parent) => {
    const base = parent ? this.state[parent] : this.state;
    const onChange = e => {
      const newState = parent
        ? { [parent]: { ...this.state[parent], [fieldName]: e.target.value } }
        : { [fieldName]: e.target.value };
      this.setState(newState);
    };
    return (
      <TripInput type="text" value={base[fieldName]} onChange={onChange} />
    );
  };

  render() {
    console.log(this.state);
    return (
      <form>
        <TripFormSection>
          <H6>Name</H6>
          {this.fieldFor('name')}
          <H6>Location</H6>
          {this.fieldFor('location')}
        </TripFormSection>
        <TripFormSection>
          <H3>Date & Time</H3>
          <TripTimeSelector onChange={time => this.setState({ time })} />
        </TripFormSection>
        <TripFormSection>
          <H3>Pricing & Capacity</H3>
          <H6>Available Spots</H6>
          {this.fieldFor('capacity')}
          <H6>Base Price</H6>
          <TripInput type="text" />
        </TripFormSection>
        <TripFormSection>
          <H3>Difficulty and Statistics</H3>
          <H6>Difficulty</H6>
          {this.fieldFor('difficulty')}
          <GridParent>
            <Column>
              <H6>Distance</H6>
              {this.fieldFor('hikeDistance', 'stats')}
            </Column>
            <Column>
              <H6>Elevation</H6>
              {this.fieldFor('elevation', 'stats')}
            </Column>
          </GridParent>
        </TripFormSection>
        <TripFormSection>
          <H3>Content</H3>
          <H6>Title</H6>
          {this.fieldFor('title', 'detail')}
          <H6>Body</H6>
          <TextArea />
        </TripFormSection>
      </form>
    );
  }
}

export default TripForm;
