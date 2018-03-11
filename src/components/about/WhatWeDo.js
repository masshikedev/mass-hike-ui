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
function WhatWeDo(props) {
  return (
    <GridParent>
      <Title>
        <H2>{RichText.asText(props.doc.data.title3)}</H2>
      </Title>
      <Column>
        <Img src={props.doc.data.about_image.url} />
      </Column>
      <Column>
        <div>{RichText.render(props.doc.data.about_content)}</div>
      </Column>
    </GridParent>
  );
}

export default WhatWeDo;
