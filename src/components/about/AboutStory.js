import React from 'react';
import styled from 'styled-components';
import { P, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';
import hero from '../../images/home-hero2.png';

const Text = P.extend`
  grid-column: span 8;
  padding: 40px;
  padding-top: 20px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
  padding: 0 40px;
  padding-top: 20px;
  order: 0;
`;

const Story = GridParent.extend``;

const Image = styled.div`
  grid-column: span 12;
  background-image: url(${hero});
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;

  ${MediaQueries.small} {
    min-height: 264px;
    background-position: right bottom;
    background-size: auto;
  }
`;

function AboutStory(props) {
  return (
    <Story>
      <Title>
        <P xxlarge bold proxima>
          {RichText.asText(props.doc.data.title2)}
        </P>
      </Title>
      <Text large>{RichText.render(props.doc.data.our_story)}</Text>
      <Image />
    </Story>
  );
}

export default AboutStory;
