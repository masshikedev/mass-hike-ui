import React from 'react';
import styled from 'styled-components';
import { H2, H8, P, Img, MediaQueries, GridParent } from '../../style';
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
  background: repeating-linear-gradient(
    135deg,
    #558959,
    #558959 10px,
    #497c49 2px,
    #497c49 12px
  );
  color: #fff;
  padding: 80px 40px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
`;

const Summary = GridParent.extend`
  grid-column-gap: 0;
`;

function HomeSummary(props) {
  console.log(props);
  return (
    <Summary>
      <Column>
        <H8>{RichText.asText(props.doc.data.about_title)}</H8>
        <P>{RichText.render(props.doc.data.about_content)}</P>
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
