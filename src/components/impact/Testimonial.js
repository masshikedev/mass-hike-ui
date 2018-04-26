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

const Quotes = GridParent.extend`
  padding: 40px 80px;
  grid-column: span 12;

  ${MediaQueries.small} {
    padding: 20px 40px;
  }
`;

const QuoteAuthor = Img.extend`
  grid-column: span 3;
  margin-top: 7%;
  border-radius: 100%;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const QuoteText = P.extend`
  padding: 7%;
  grid-column: span 9;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: ${({ right }) => (right ? '20' : '0')};
  }
`;

function Testimonial(props) {
  return (
    <GridParent>
      <TitleWrapper>
        <SmallHR />
        <Title proxima size="xlarge" bold>
          Our Stories
        </Title>
        <SmallHR />
      </TitleWrapper>
      <Quotes>
        <QuoteAuthor src={props.doc.data.testimonial2_image.url} />
        <QuoteText size="large">
          "{RichText.asText(props.doc.data.testimonial2)}"
        </QuoteText>
        <QuoteText right size="large">
          "{RichText.asText(props.doc.data.testimonial2)}"
        </QuoteText>
        <QuoteAuthor src={props.doc.data.testimonial3_image.url} />
      </Quotes>
    </GridParent>
  );
}

export default Testimonial;
