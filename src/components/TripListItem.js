import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import previewImage from '../images/square.png'; // relative path to image
import Button from '../style/Button';
import { P, H2, H3, H4, H6, Img, GridParent, MediaQueries } from '../style';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DAY_MONTH_DATE_YEAR } from '../utils/dateFormats';

const Wrapper = GridParent.extend`
  margin-bottom: 100px;
`;

const TripImage = Img.extend`
  grid-column: span 5;

  ${MediaQueries.small} {
    grid-column: span 12;
    margin-bottom: 20px;
  }
`;

const InfoWrapper = styled.div`
  grid-column: span 7;

  ${MediaQueries.small} {
    grid-column: span 12;
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
          <Button onClick={() => this.props.toDetail(tripId)}>
            Learn More
          </Button>
        </InfoWrapper>
      </Wrapper>
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
