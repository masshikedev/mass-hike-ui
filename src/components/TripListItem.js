import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

const TripWrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const Wrapper = GridParent.extend`
  grid-gap: 0;
`;

const TripDate = P.extend`
  position: absolute;
  background-color: #fff;
  width: fit-content;
  padding: 5px 10px;
  margin: 0;
  top: 30px;
  left: 50px;
  text-transform: uppercase;
  z-index: 1;

  ${MediaQueries.small} {
    left: 50%;
    transform: translate(-50%, 30%);
    display: none;
  }
`;

const SoldOut = TripDate.extend`
  background-color: ${constants.orange};
  top: 100px;
  ${MediaQueries.small} {
    top: 45px;
    display: block;
  }
`;

const TripImage = styled.div`
  grid-column: span 6;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: ${props => (props.soldOut ? 'grayscale(100%)' : 'none')};

  ${MediaQueries.small} {
    grid-column: span 12;
    min-height: 300px;
  }
`;

const InfoWrapper = styled.div`
  grid-column: span 5;
  display: grid;
  padding: 40px;
  background: ${constants.offwhiteBg};
  p {
    margin-bottom: 0;
  }
  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
  margin-top: 20px;
`;

const InfoSectionColumn = styled.div`
  grid-column: span 1;
  ${MediaQueries.medium} {
    grid-column: span 2;
  }
`;

const InfoSectionItem = styled.div`
  margin-bottom: 20px;
`;

const LearnMore = Button.extend`
  margin-left: 0;
  margin-right: auto;
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
      imageUrl,
    } = this.props;
    const dateString = moment.utc(date).format(MONTH_DATE);
    const timeString = moment.utc(date).format(TIME);
    return (
      <TripWrapper>
        <TripDate proxima bold size="large" color="orange">
          {dateString}
        </TripDate>
        {spotsRemaining === 0 && (
          <SoldOut proxima bold size="large" color="white">
            Sold out
          </SoldOut>
        )}
        <Wrapper>
          <Margin />
          <TripImage bg={imageUrl} soldOut={spotsRemaining === 0} />
          <InfoWrapper>
            <P proxima bold color="green" size="xlarge">
              {name}
            </P>
            <InfoSection>
              <InfoSectionColumn>
                <InfoSectionItem>
                  <P proxima bold uppercase size="medium">
                    Location
                  </P>
                  <P proxima>{location}</P>
                </InfoSectionItem>
                <InfoSectionItem>
                  <P proxima bold uppercase size="medium">
                    Availability
                  </P>
                  <P proxima>{`${spotsRemaining} spots left`}</P>
                </InfoSectionItem>
              </InfoSectionColumn>
              <InfoSectionColumn>
                <InfoSectionItem>
                  <P proxima bold uppercase size="medium">
                    Time
                  </P>
                  <P proxima>{timeString}</P>
                </InfoSectionItem>
                <InfoSectionItem>
                  <P proxima bold uppercase size="medium">
                    Difficulty
                  </P>
                  <P proxima capitalize>{`${difficulty}`}</P>
                </InfoSectionItem>
              </InfoSectionColumn>
            </InfoSection>
            <LearnMore primary onClick={() => this.props.toDetail(tripId)}>
              Learn More
            </LearnMore>
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
