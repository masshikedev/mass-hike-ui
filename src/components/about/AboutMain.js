import React from 'react';
import styled from 'styled-components';
import { H1, P, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function AboutMain(props) {
  return (
    <GridParent>
      <Column>
        <H1>{RichText.asText(props.doc.data.title)}</H1>
        <P>{RichText.asText(props.doc.data.main_content)}</P>
      </Column>
    </GridParent>
  );
}

export default AboutMain;
