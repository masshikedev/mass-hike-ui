import React from 'react';
import styled from 'styled-components';
import { constants, P, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
`;

const Content = GridParent.extend`
  background: ${constants.greenBg};
  color: #fff;
  padding: 80px;

  ${MediaQueries.small} {
    padding: 40px;
  }
`;
function WhatWeDo(props) {
  return (
    <Content>
      <Title>
        <P proxima xxlarge bold>
          {RichText.asText(props.doc.data.title3)}
        </P>
      </Title>
      <Column>
        <ul>
          <li>
            <P proxima bold uppercase white>
              {RichText.asText(props.doc.data.wwd_title1)}
            </P>
          </li>
        </ul>
        <P large>{RichText.asText(props.doc.data.wwd_content1)}</P>
      </Column>
      <Column>
        <ul>
          <li>
            <P proxima bold uppercase white>
              {RichText.asText(props.doc.data.wwd_title2)}
            </P>
          </li>
        </ul>
        <P large>{RichText.asText(props.doc.data.wwd_content2)}</P>
      </Column>
      <Column>
        <ul>
          <li>
            <P proxima bold uppercase white>
              {RichText.asText(props.doc.data.wwd_title3)}
            </P>
          </li>
        </ul>
        <P large>{RichText.asText(props.doc.data.wwd_content3)}</P>
      </Column>
    </Content>
  );
}

export default WhatWeDo;
