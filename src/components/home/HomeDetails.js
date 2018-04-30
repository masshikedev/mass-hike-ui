import React from 'react';
import styled from 'styled-components';
import { H2, P, constants, MediaQueries, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const DetailItem = P.extend`
  grid-column: span 6;
  display: flex;
  align-items: center;
`;

const StepNumber = styled.div`
  grid-column: span 1;
  font-size: 120px;
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-right: 25px;
  color: ${constants.yellow};
`;

const StepImage = styled.div`
  grid-column: span 6;
  padding-right: 60px;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 10px 25px;
    margin-bottom: 30px;
  }
`;

const TitleSection = GridParent.extend`
  grid-row-gap: 100px;
  padding-bottom: 30px;

  ${MediaQueries.small} {
    padding: 20px;
  }
`;

const Step = GridParent.extend`
  max-width: 1000px;
  width: 80%;
  padding: 60px 0;
  margin: 0 auto;
`;

const StepText = styled.div`
  grid-column: span 6;
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
  ${MediaQueries.small} {
    padding: 0;
  }
`;

const Divider = styled.span`
  border: solid 1px ${constants.darkgray};
  display: block;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
`;

function HomeDetails(props) {
  return (
    <div>
      <TitleSection>
        <Title>
          <Line>{RichText.asText(props.doc.data.detail_main_title)}</Line>
        </Title>
      </TitleSection>
      <Step>
        <StepImage>
          <Img src={props.doc.data.detail1[0].url} />
        </StepImage>
        <StepText>
          <StepNumber>1</StepNumber>
          <DetailItem proxima size="large">
            {props.doc.data.detail1[2].text}
          </DetailItem>
        </StepText>
      </Step>
      <Divider />
      <Step>
        <StepImage>
          <Img src={props.doc.data.detail2[0].url} />
        </StepImage>
        <StepText>
          <StepNumber>2</StepNumber>
          <DetailItem proxima size="large">
            {props.doc.data.detail2[2].text}
          </DetailItem>
        </StepText>
      </Step>
      <Divider />
      <Step>
        <StepImage>
          <Img src={props.doc.data.detail3[0].url} />
        </StepImage>
        <StepText>
          <StepNumber>3</StepNumber>
          <DetailItem proxima size="large">
            {props.doc.data.detail3[2].text}
          </DetailItem>
        </StepText>
      </Step>
    </div>
  );
}

export default HomeDetails;
