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
  margin-bottom: 20px;
`;

const Tree = P.extend`
  display: inline-block;
`;

const Content = GridParent.extend`
  background: ${constants.green} ${constants.greenBg};
  background-blend-mode: multiply;
  color: #fff;
  padding: 80px;
  grid-column-gap: 40px;

  ${MediaQueries.small} {
    padding: 40px;
  }
`;

const ListItem = styled.li`
  margin-left: -16px;
`;

function WhatWeDo(props) {
  return (
    <Content>
      <Title>
        <P proxima size="xlarge" bold color="white">
          {RichText.asText(props.doc.data.title3)}
        </P>
      </Title>
      <Column>
        <ul>
          <ListItem>
            <Tree proxima bold uppercase spaced color="white">
              {RichText.asText(props.doc.data.wwd_title1)}
            </Tree>
          </ListItem>
        </ul>
        <P size="large" color="white">
          {RichText.asText(props.doc.data.wwd_content1)}
        </P>
      </Column>
      <Column>
        <ul>
          <ListItem>
            <Tree proxima bold uppercase spaced color="white">
              {RichText.asText(props.doc.data.wwd_title2)}
            </Tree>
          </ListItem>
        </ul>
        <P size="large" color="white">
          {RichText.asText(props.doc.data.wwd_content2)}
        </P>
      </Column>
      <Column>
        <ul>
          <ListItem>
            <Tree proxima bold uppercase spaced color="white">
              {RichText.asText(props.doc.data.wwd_title3)}
            </Tree>
          </ListItem>
        </ul>
        <P size="large" color="white">
          {RichText.asText(props.doc.data.wwd_content3)}
        </P>
      </Column>
    </Content>
  );
}

export default WhatWeDo;
