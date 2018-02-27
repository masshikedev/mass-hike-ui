import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Img, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const DetailItem = styled.div`
  grid-column: span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Content = styled.div`
  grid-column: span 12;
`;

const Title = styled.div`
  grid-column: span 12;
`;

function HomeDetails(props) {
  return (
    <GridParent>
      <Title>
        <H2>{RichText.asText(props.doc.data.detail_main_title)}</H2>
      </Title>
      <DetailItem>{RichText.render(props.doc.data.detail1)}</DetailItem>
      <DetailItem>{RichText.render(props.doc.data.detail2)}</DetailItem>
      <DetailItem>{RichText.render(props.doc.data.detail3)}</DetailItem>
    </GridParent>
  );
}

export default HomeDetails;
