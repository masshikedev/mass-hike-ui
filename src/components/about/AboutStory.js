import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, H2, P, Img, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 6;
`;

const Title = styled.div`
  grid-column: span 12;
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
      <Column>
        <Img src={props.doc.data.story_image.url} />
      </Column>
    </GridParent>
  );
}

export default AboutStory;
