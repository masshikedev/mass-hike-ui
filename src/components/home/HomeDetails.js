import React from 'react';
import styled from 'styled-components';
import { H2, P, constants, MediaQueries, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const DetailItem = P.extend`
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
  padding-right: 10px;
  color: ${constants.yellow};
`;

const DetailImage = styled.div`
  grid-column-start: 3;
  grid-column-end: 7;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 10px 25px;
  }
`;

const Details = GridParent.extend`
  grid-row-gap: 100px;
  padding-bottom: 30px;

  ${MediaQueries.small} {
    padding: 20px;
  }
`;

const Step = styled.div`
  grid-column-start: 8;
  grid-column-end: 12;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = H2.extend`
  margin-top: 8%;
  grid-column-start: 2;
  grid-column-end: 12;
  text-align: center;
  line-height: 0;
  border-bottom: solid 2px ${constants.darkgray};
  padding: 0;

  ${MediaQueries.small} {
    grid-column: span 12;
    border: none;
    line-height: 1;
  }
`;

const Line = styled.span`
  background: ${constants.gray};
  padding: 0 15px;
`;

const Divider = styled.span`
  display: inline-block;
  grid-column-start: 2;
  grid-column-end: 12;
  border: solid 2px ${constants.darkgray};
  display: block;
`;

function HomeDetails(props) {
  return (
    <Details>
      <Title>
        <Line>{RichText.asText(props.doc.data.detail_main_title)}</Line>
      </Title>
      <DetailImage>
        <Img src={props.doc.data.detail1[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>1</StepNumber>
        <DetailItem proxima large>
          {props.doc.data.detail1[2].text}
        </DetailItem>
      </Step>
      <Divider />
      <DetailImage>
        <Img src={props.doc.data.detail2[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>2</StepNumber>
        <DetailItem proxima large>
          {props.doc.data.detail2[2].text}
        </DetailItem>
      </Step>
      <Divider />
      <DetailImage>
        <Img src={props.doc.data.detail3[0].url} />
      </DetailImage>
      <Step>
        <StepNumber>3</StepNumber>
        <DetailItem proxima large>
          {props.doc.data.detail3[2].text}
        </DetailItem>
      </Step>
    </Details>
  );
}

export default HomeDetails;
