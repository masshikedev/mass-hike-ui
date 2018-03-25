import React from 'react';
import styled from 'styled-components';
import { H2, P, Img, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Top = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    order: -1;
    grid-column: span 12;
  }
`;

const Column = styled.div`
  grid-column: span 8;
  background-color: #558959;
  color: #fff;
  padding: 40px 80px 40px 40px;

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
      <Column>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
        <P>{RichText.asText(props.doc.data.about_content)}</P>
      </Column>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </GridParent>
  );
}

export default HomeSummary;
