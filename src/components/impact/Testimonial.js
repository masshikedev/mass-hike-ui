import React from 'react';
import styled from 'styled-components';
import {
  MediaQueries,
  Img,
  H1,
  H2,
  HR,
  P,
  constants,
  GridParent,
} from '../../style';
import { RichText } from 'prismic-reactjs';

const SectionWrapper = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;

  ${MediaQueries.small} {
    width: 80%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const Title = P.extend`
  flex-shrink: 0;
  width: fit-content;
  margin: 0 50px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 60px;
  flex-grow: 0.5;
  :not(:first-child) {
    margin: 30px 0;
  }
`;

const BlockQuote = P.extend`
  font-size: 120px;
  color: ${constants.yellow};
  position: relative;
  margin-bottom: 0;
  height: 0;
  top: -50px;
  left: -50px;
  z-index: 0;

  ${MediaQueries.medium} {
    left: -30px;
  }
`;

const SmallHR = HR.extend`
  width: 35%;
  color: ${constants.gray};

  ${MediaQueries.small} {
    width: 0;
  }
`;

const QuoteSection = styled.div`
  padding: 40px 0;

  ${MediaQueries.small} {
    padding: 20px 0;
  }
`;

const Quote = styled.div`
  margin-bottom: 100px;
`;

const QuoteText = P.extend`
  position: relative;
  z-index: 1;
`;

const Author = P.extend`
  text-align: right;
`;

function Testimonial(props) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <SmallHR />
        <Title proxima size="xlarge" bold>
          Our Stories
        </Title>
        <SmallHR />
      </TitleWrapper>
      <ContentWrapper>
        <QuoteSection>
          <Quote>
            <BlockQuote>“</BlockQuote>
            <QuoteText size="large">
              "{RichText.asText(props.doc.data.testimonial2)}"
            </QuoteText>
            <Author proxima bold size="large">
              - {RichText.asText(props.doc.data.testimonial_author2)}
            </Author>
          </Quote>
          <Quote size="large">
            <BlockQuote>“</BlockQuote>
            <QuoteText size="large">
              "{RichText.asText(props.doc.data.testimonial2)}"
            </QuoteText>
            <Author proxima bold size="large">
              - {RichText.asText(props.doc.data.testimonial_author3)}
            </Author>
          </Quote>
        </QuoteSection>
      </ContentWrapper>
    </SectionWrapper>
  );
}

export default Testimonial;
