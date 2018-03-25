import React from 'react';
import styled from 'styled-components';
import { H2, MediaQueries, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const DetailItem = styled.div`
  grid-column: span 6;
  display: flex;
  align-items center;
  
`;

const Title = styled.div`
  grid-column: span 12;
  text-align: center;
`;

function HomeDetails(props) {
  return (
    <GridParent>
      <Title>
        <H2>{RichText.asText(props.doc.data.detail_main_title)}</H2>
      </Title>
      <DetailItem>
        <Img src={props.doc.data.detail1[0].url} />
      </DetailItem>
      <DetailItem>{props.doc.data.detail1[2].text}</DetailItem>
      <DetailItem>
        <Img src={props.doc.data.detail2[0].url} />
      </DetailItem>
      <DetailItem>{props.doc.data.detail2[2].text}</DetailItem>
      <DetailItem>
        <Img src={props.doc.data.detail3[0].url} />
      </DetailItem>
      <DetailItem>{props.doc.data.detail3[2].text}</DetailItem>
    </GridParent>
  );
}

export default HomeDetails;
