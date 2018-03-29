import React from 'react';
import styled from 'styled-components';
import { H8, H6, Img, constants, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Top = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    display: none;
  }
`;

const Lists = styled.div`
  display: flex;

  ${MediaQueries.small} {
    flex-direction: column;
  }
`;

const List = styled.ul`
  margin: 10px;
  flex: 1;
`;

const Column = styled.div`
  grid-column: span 8;
  background: ${constants.greenBg};
  color: #fff;
  padding: 80px 40px;
  line-height: 1.5;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Summary = GridParent.extend`
  grid-column-gap: 0;
`;

function HomeSummary(props) {
  return (
    <Summary>
      <Column>
        <H8>{RichText.asText(props.doc.data.about_title)}</H8>
        <H6>{RichText.render(props.doc.data.about_content)}</H6>
        <Lists>
          <List>
            <H8>{RichText.asText(props.doc.data.list1_title)}</H8>
            {RichText.render(props.doc.data.list1)}
          </List>
          <List>
            <H8>{RichText.asText(props.doc.data.list2_title)}</H8>
            {RichText.render(props.doc.data.list2)}
          </List>
        </Lists>
      </Column>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </Summary>
  );
}

export default HomeSummary;
