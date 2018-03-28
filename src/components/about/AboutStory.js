import React from 'react';
import styled from 'styled-components';
import { H2, Img, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    order: 2;
    grid-column: span 12;
  }
`;

const ImgColumn = Img.extend`
  grid-column: span 6;

  ${MediaQueries.small} {
    order: 1;
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
  order: 0;
`;
function AboutStory(props) {
  return (
    <GridParent>
      <Title>
        <H2>{RichText.asText(props.doc.data.title2)}</H2>
      </Title>
      <Column>
        <div>{RichText.render(props.doc.data.our_story)}</div>
      </Column>
      <ImgColumn src={props.doc.data.story_image.url} />
    </GridParent>
  );
}

export default AboutStory;
