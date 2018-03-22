import React from 'react';
import styled from 'styled-components';
import { H2, H4, P, Button, MediaQueries, Img, GridParent } from '../../style';

const Column = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

function BlogPreview(props) {
  return (
    <GridParent>
      <Column>
        <Img src={props.img} />
      </Column>
      <Column>
        <H2>{props.title}</H2>
        <H4>
          {props.date} - by {props.author}
        </H4>
        <P>{props.content}</P>
        <Button>Read More</Button>
      </Column>
    </GridParent>
  );
}

export default BlogPreview;
