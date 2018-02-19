import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import P from '../style/P';
import H2 from '../style/H2';
import H3 from '../style/H3';
import H4 from '../style/H4';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 50px 0px 50px 0px;
  display: flex;
  justify-content: center;
  flex-flow: row;
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
`;

const InfoWrapper = styled.div`
  padding-left: 10px;
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
