import React from 'react';
import styled from 'styled-components';
import { H2, H7, MediaQueries, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const DetailItem = H7.extend`
  grid-column: span 6;
  display: flex;
  align-items center;
  
`;

const StepNumber = styled.div`
  grid-column: span 1;
  font-size: 120px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #faaf3f;
`;

const DetailImage = styled.div`
  grid-column-start: 3;
  grid-column-end: 7;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Details = GridParent.extend`
  grid-row-gap: 100px;
`;

const Step = styled.div`
  grid-column-start: 8;
  grid-column-end: 11;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  margin-top: 20px;
  grid-column: span 12;
  text-align: center;
`;

const Divider = styled.span`
  border-top: 1px solid #333;
  display: inline-block;
  grid-column-start: 2;
  grid-column-end: 12;
  height: 1px;
  display: block;
`;

function HomeDetails(props) {
  return (
    <Details>
      <Title>
        <H2>{RichText.asText(props.doc.data.detail_main_title)}</H2>
      </Title>
      <DetailImage>
        <Img src={props.doc.data.detail1[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>1</StepNumber>
        <DetailItem>{props.doc.data.detail1[2].text}</DetailItem>
      </Step>
      <Divider />
      <DetailImage>
        <Img src={props.doc.data.detail2[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>2</StepNumber>
        <DetailItem>{props.doc.data.detail2[2].text}</DetailItem>
      </Step>
      <Divider />
      <DetailImage>
        <Img src={props.doc.data.detail3[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>3</StepNumber>
        <DetailItem>{props.doc.data.detail3[2].text}</DetailItem>
      </Step>
    </Details>
  );
}

export default HomeDetails;
