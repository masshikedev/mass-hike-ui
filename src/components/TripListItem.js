import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import { P, H2, H3, H4, H6 } from '../style';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DAY_MONTH_DATE_YEAR } from '../utils/dateFormats';

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
    const { name, date, location, spotsRemaining, difficulty, id } = this.props;
    const dateString = format(date, DAY_MONTH_DATE_YEAR);
    return (
      <Wrapper>
        <TripImage src={previewImage} alt={name} />
        <InfoWrapper>
          <H2>{name}</H2>
          <H3>{`${dateString} - ${location}`}</H3>
          <H4>{`${spotsRemaining} spots remaining`}</H4>
          <br />
          <H6>Difficulty</H6>
          <P capitalize>{`${difficulty}`}</P>
          <br />
          <Button onClick={() => this.props.toDetail(id)}> Learn More </Button>
        </InfoWrapper>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toDetail: id => push(`trips/${id}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripListItem);
