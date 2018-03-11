import React from 'react';
import styled from 'styled-components';
import { H2, H3, H4, P, Button, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 6;
`;

function BlogPreview(props) {
  console.log(props);
  return (
    <GridParent>
      {props.order === 'left' && (
        <Column>
          <Img src={props.img} />
        </Column>
      )}
      <Column>
        <H2>{props.title}</H2>
        <H4>
          {props.date} - by {props.author}
        </H4>
        <P>{props.content}</P>
        <Button>Read More</Button>
      </Column>
      {props.order === 'right' && (
        <Column>
          <Img src={props.img} />
        </Column>
      )}
    </GridParent>
  );
}

export default BlogPreview;
