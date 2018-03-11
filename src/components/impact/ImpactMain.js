import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, P, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function ImpactMain(props) {
  return (
    <GridParent>
      <Column>
        <H1>{RichText.asText(props.doc.data.impact_title)}</H1>
        <div>{RichText.render(props.doc.data.main_content)}</div>
      </Column>
    </GridParent>
  );
}

export default ImpactMain;
