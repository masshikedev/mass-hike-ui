import React from 'react';
import styled from 'styled-components';
import { P, Img, constants, MediaQueries, GridParent } from '../../style';
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
  flex: 1;
  margin-top: 10px;
`;

const Column = styled.div`
  grid-column: span 8;
  background: ${constants.green} ${constants.greenBg};
  background-blend-mode: multiply;
  color: #fff;
  padding: 80px 40px;
  line-height: 1.5;
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const ColumnContent = styled.div`
  grid-column: 2 / span 10;

  ${MediaQueries.small} {
    grid-column: 1 / span 10;
  }
`;

const Summary = GridParent.extend`
  grid-column-gap: 0;
`;

function HomeSummary(props) {
  return (
    <Summary>
      <Column>
        <ColumnContent>
          <P uppercase bold proxima color="white">
            {RichText.asText(props.doc.data.about_title)}
          </P>
          <P color="white" size="large">
            {RichText.render(props.doc.data.about_content)}
          </P>
          <Lists>
            <List>
              <P uppercase bold proxima color="white">
                {RichText.asText(props.doc.data.list1_title)}
              </P>
              {RichText.render(props.doc.data.list1)}
            </List>
            <List>
              <P uppercase bold proxima color="white">
                {RichText.asText(props.doc.data.list2_title)}
              </P>
              {RichText.render(props.doc.data.list2)}
            </List>
          </Lists>
        </ColumnContent>
      </Column>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </Summary>
  );
}

export default HomeSummary;
