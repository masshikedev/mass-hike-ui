import React, { Component } from 'react';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import P from '../style/P';
import H2 from '../style/H2';
import H4 from '../style/H4';
import styled from 'styled-components';
import { format } from 'date-fns';

const Wrapper = styled.div`
  padding: 50px 0px 50px 0px;
  display: grid;
  grid-template-columns: 100px 450px auto;
`;

const Header = P.extend`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.7px;
`;

const Description = P.extend`
  letter-spacing: 0.8px;
  text-transform: capitalize;
`;

const TripImage = styled.img`
  margin: auto 0;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const InfoWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`;

class TripListItem extends Component {
  render() {
    const { name, date, location, spotsRemaining, difficulty } = this.props;
    const dateString = format(date, 'dddd MMMM do[,] YYYY');
    return (
      <Wrapper>
        <TripImage src={previewImage} alt={name} />
        <InfoWrapper>
          <H2>{name}</H2>
          <P>{`${dateString} - ${location}`}</P>
          <H4>{`${spotsRemaining} spots remaining`}</H4>
          <br />
          <Header>Difficulty</Header>
          <Description>{`${difficulty}`}</Description>
          <br />
          <Button> Book Now </Button>
        </InfoWrapper>
      </Wrapper>
    );
  }
}

export default TripListItem;
