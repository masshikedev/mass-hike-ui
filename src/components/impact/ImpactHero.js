import React from 'react';
import styled from 'styled-components';
import { GridParent, constants, P, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Text = styled.div`
  grid-column: span 5;
  padding: 40px 80px;
  padding-top: 80px;
  background: ${constants.orangeBg};
  color: #fff;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
`;

const BlockQuote = P.extend`
  font-size: 560px;
  color: ${constants.yellow};
  position: relative;
  margin-bottom: 0;
  height: 0;
  top: -250px;
  left: -150px;
  z-index: 0;

  ${MediaQueries.small} {
    font-size: 400px;
    top: -165px;
    left: -40px;
  }
`;

const Image = styled.div`
  grid-column: span 7;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 0;
    min-height: 250px;
  }
`;

const Hero = GridParent.extend`
  grid-gap: 0;
`;

const QuoteContent = P.extend`
  z-index: 1;
  position: relative;
  text-align: center;

  ${MediaQueries.small} {
    font-size: 36px;
  }
`;

const QuoteAuthor = QuoteContent.extend`
  ${MediaQueries.small} {
    text-align: right;
  }
`;

function ImpactHero(props) {
  return (
    <Hero>
      <Image bg={props.doc.data.testimonial_image.url} />
      <Text>
        <BlockQuote proxima>“</BlockQuote>
        <QuoteContent color="white" size="xlarge">
          {RichText.asText(props.doc.data.testimonial)}
        </QuoteContent>
        <QuoteAuthor color="white" size="xlarge">
          -{RichText.asText(props.doc.data.testimonial_author)}
        </QuoteAuthor>
      </Text>
    </Hero>
  );
}

export default ImpactHero;
