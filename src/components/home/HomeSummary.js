import React from 'react';
import styled from 'styled-components';
import { H2, Img, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Top = styled.div`
  grid-column: span 6;
  ${MediaQueries.small} {
    order: -1;
    grid-column: span 12;
  }
`;

const Column = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
`;

function HomeSummary(props) {
  return (
    <GridParent>
      <Title>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
      </Title>
      <Column>{RichText.asText(props.doc.data.about_content)}</Column>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </GridParent>
  );
}

export default HomeSummary;
