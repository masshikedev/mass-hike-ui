import React from 'react';
import styled from 'styled-components';
import { H2, P, Img } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
`;

const Content = styled.div`
  display: flex;
  height: 500px;
`;

function HomeSummary(props) {
  return (
    <Wrapper>
      <div>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
        <Content>{RichText.asText(props.doc.data.about_content)}</Content>
      </div>
    </Wrapper>
  );
}

export default HomeSummary;
