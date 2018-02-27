import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Details = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  ${MediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`;

const Content = styled.div`
  grid-column: span 12;
`;

const Title = styled.div`
  grid-column: span 12;
`;

const DetailItem = styled.div``;

function HomeDetails(props) {
  return (
    <Wrapper>
      <Title>
        <H2>{RichText.asText(props.doc.data.detail_main_title)}</H2>
      </Title>
      <Details>
        <DetailItem>{RichText.render(props.doc.data.detail1)}</DetailItem>
        <DetailItem>{RichText.render(props.doc.data.detail2)}</DetailItem>
        <DetailItem>{RichText.render(props.doc.data.detail3)}</DetailItem>
      </Details>
    </Wrapper>
  );
}

export default HomeDetails;
