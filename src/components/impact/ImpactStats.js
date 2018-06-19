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
import hero from '../../images/impact-hero.png';
import { RichText } from 'prismic-reactjs';

const Background = styled.div`
  background: url(${hero});
  background-size: cover;
  background-position: center bottom;
  background-repeat: repeat-x;

  ${MediaQueries.small} {
    background: none;
  }
`;

const Content = GridParent.extend`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 15%;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 100px 0;
  grid-column: span 3;

  ${MediaQueries.medium} {
    grid-column: span 6;
    padding: 50px 0;
  }

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
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
    <Background>
      <Content>
        <TitleWrapper>
          <SmallHR />
          <Title proxima bold size="xlarge">
            Our Impact
          </Title>
          <SmallHR />
        </TitleWrapper>
        <StatItem>
          <StatNum center>{props.doc.data.stat_year}</StatNum>
          <P proxima medium size="large">
            {RichText.asText(props.doc.data.stat_text1)}
          </P>
        </StatItem>
        <StatItem>
          <StatNum center>{props.doc.data.stat_community_members}</StatNum>
          <P proxima medium size="large">
            {RichText.asText(props.doc.data.stat_text2)}
          </P>
        </StatItem>
        <StatItem>
          <StatNum center>{props.doc.data.stat_subscribers}</StatNum>
          <P proxima medium size="large">
            {RichText.asText(props.doc.data.stat_text3)}
          </P>
        </StatItem>
        <StatItem>
          <StatNum center>{props.doc.data.stat_trips}</StatNum>
          <P proxima medium size="large">
            {RichText.asText(props.doc.data.stat_text4)}
          </P>
        </StatItem>
      </Content>
    </Background>
  );
}

export default ImpactStats;
