import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import { P, constants, GridParent, MediaQueries } from '../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE, TIME } from '../utils/dateFormats';

const Margin = styled.div`
  background: ${constants.lightgreenBg};
  grid-column: span 1;

  ${MediaQueries.small} {
    grid-column: span 12;
    height: 80px;
  }
`;

const TripWrapper = styled.div``;

const Wrapper = GridParent.extend`
  grid-gap: 0;
`;

const Date = P.extend`
  position: relative;
  background-color: #fff;
  width: fit-content;
  padding: 5px 10px;
  margin: 0;
  top: 90px;
  left: 50px;

  ${MediaQueries.small} {
    left: 50%;
    transform: translate(-50%, 30%);
  }
`;

const TripImage = styled.div`
  grid-column: span 6;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  ${MediaQueries.small} {
    grid-column: span 12;
    min-height: 300px;
  }
`;

const InfoWrapper = styled.div`
  grid-column: span 5;
  padding: 40px;
  background: ${constants.offwhiteBg};
  p {
    margin-bottom: 0;
  }
  ${MediaQueries.small} {
    grid-column: span 12;
    text-align: center;
  }
`;

class TripListItem extends Component {
  render() {
    const {
      name,
      date,
      location,
      spotsRemaining,
      difficulty,
      tripId,
    } = this.props;
    const dateString = moment(date).format(MONTH_DATE);
    const timeString = moment(date).format(TIME);
    return (
      <TripWrapper>
        <Date proxima bold size="large" color="orange">
          {dateString}
        </Date>
        <Wrapper>
          <Margin />
          <TripImage bg={previewImage} />
          <InfoWrapper>
            <P proxima bold color="green" size="xlarge">
              {name}
            </P>
            <P proxima bold uppercase size="medium">
              Location
            </P>
            <P proxima>{location}</P>
            <P proxima bold uppercase size="medium">
              Time
            </P>
            <P proxima>{timeString}</P>
            <P proxima bold uppercase size="medium">
              Availability
            </P>
            <P proxima>{`${spotsRemaining} spots left`}</P>
            <P proxima bold uppercase size="medium">
              Difficulty
            </P>
            <P proxima capitalize>{`${difficulty}`}</P>
            <br />
            <Button primary onClick={() => this.props.toDetail(tripId)}>
              Learn More
            </Button>
          </InfoWrapper>
        </Wrapper>
      </TripWrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toDetail: tripId => push(`trips/${tripId}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripListItem);
