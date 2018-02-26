import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Details = styled.div`
  display: flex;

  ${MediaQueries.small} {
    flex-direction: column;
  }
`;

const DetailItem = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
`;

const Circle = styled.div`
  border: solid;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

function HomeDetails(props) {
  return (
    <Wrapper>
      <H2>{RichText.asText(props.doc.data.detail_main_title)}</H2>
      <Details>
        <DetailItem>{RichText.render(props.doc.data.detail1)}</DetailItem>
        <DetailItem>{RichText.render(props.doc.data.detail2)}</DetailItem>
        <DetailItem>{RichText.render(props.doc.data.detail3)}</DetailItem>
      </Details>
    </Wrapper>
  );
}

export default HomeDetails;
