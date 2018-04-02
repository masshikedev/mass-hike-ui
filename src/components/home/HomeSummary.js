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
        <P uppercase bold proxima white>
          {RichText.asText(props.doc.data.about_title)}
        </P>
        <P white medium>
          {RichText.render(props.doc.data.about_content)}
        </P>
        <Lists>
          <List>
            <P uppercase bold proxima white>
              {RichText.asText(props.doc.data.list1_title)}
            </P>
            {RichText.render(props.doc.data.list1)}
          </List>
          <List>
            <P uppercase bold proxima white>
              {RichText.asText(props.doc.data.list2_title)}
            </P>
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
