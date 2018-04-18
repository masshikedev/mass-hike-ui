import React from 'react';
import styled from 'styled-components';
import {
  MediaQueries,
  Img,
  H1,
  H2,
  P,
  HR,
  constants,
  GridParent,
} from '../../style';
import { RichText } from 'prismic-reactjs';

const StatItem = styled.div`
  text-align: center;
  padding: 100px 55px;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
`;

const StatLeft = StatItem.extend`
  grid-column-start: 3;
  grid-column-end: 7;
`;

const StatRight = StatItem.extend`
  grid-column-start: 7;
  grid-column-end: 11;
`;

const StatNum = H1.extend`
  font-size: 105px;
  color: ${constants.yellow};
  margin: 0;

  ${MediaQueries.small} {
    font-size: 105px;
  }
`;

const Title = P.extend`
  flex-shrink: 0;
  width: fit-content;
  margin: 0 50px;
`;

const TitleWrapper = styled.div`
  grid-column: span 12;
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 60px;
  flex-grow: 0.5;
  :not(:first-child) {
    margin: 30px 0;
  }
`;

const SmallHR = HR.extend`
  width: 35%;
  color: ${constants.gray};

  ${MediaQueries.small} {
    width: 0;
  }
`;

function ImpactStats(props) {
  return (
    <GridParent>
      <TitleWrapper>
        <SmallHR />
        <Title proxima bold size="xlarge">
          Our Impact
        </Title>
        <SmallHR />
      </TitleWrapper>
      <StatLeft>
        <StatNum>{props.doc.data.stat_year}</StatNum>
        <P proxima size="large">
          {RichText.asText(props.doc.data.stat_text1)}
        </P>
      </StatLeft>
      <StatRight>
        <StatNum>{props.doc.data.stat_community_members}</StatNum>
        <P proxima size="large">
          {RichText.asText(props.doc.data.stat_text2)}
        </P>
      </StatRight>
      <StatLeft>
        <StatNum>{props.doc.data.stat_subscribers}</StatNum>
        <P proxima size="large">
          {RichText.asText(props.doc.data.stat_text3)}
        </P>
      </StatLeft>
      <StatRight>
        <StatNum>{props.doc.data.stat_trips}</StatNum>
        <P proxima size="large">
          {RichText.asText(props.doc.data.stat_text4)}
        </P>
      </StatRight>
    </GridParent>
  );
}

export default ImpactStats;
