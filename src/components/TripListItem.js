import React, { Component } from 'react';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import { P, H2, H3, H4, H6 } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: left;
  flex-flow: row wrap;
`;

const TripImage = styled.img`
  margin: auto 0;
`;

const InfoWrapper = styled.div`
  padding-left: 10px;
  flex-grow: 1;
`;

class TripListItem extends Component {
  render() {
    const { name, date, location, spotsRemaining, difficulty } = this.props;
    return (
      <Wrapper>
        <TripImage src={previewImage} alt={name} />
        <InfoWrapper>
          <H2>{name}</H2>
          <H3>{`${date} - ${location}`}</H3>
          <H4>{`${spotsRemaining} spots remaining`}</H4>
          <br />
          <H6>Difficulty</H6>
          <P capitalize>{`${difficulty}`}</P>
          <br />
          <Button> Book Now </Button>
        </InfoWrapper>
      </Wrapper>
    );
  }
}

export default TripListItem;
