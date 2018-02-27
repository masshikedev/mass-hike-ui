import React from 'react';
import styled from 'styled-components';
import { H2, P, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr;
  ${MediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Top = styled.div`
  ${MediaQueries.small} {
    order: -1;
  }
`;

const Title = styled.div`
  grid-column: span 2;

  ${MediaQueries.small} {
    grid-column: span 1;
  }
`;

function HomeSummary(props) {
  return (
    <Wrapper>
      <Title>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
      </Title>
      <div>{RichText.asText(props.doc.data.about_content)}</div>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </Wrapper>
  );
}

export default HomeSummary;
