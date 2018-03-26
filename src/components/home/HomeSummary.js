import React from 'react';
import styled from 'styled-components';
import { H2, P, Img, MediaQueries, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Top = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    display: none;
  }
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
  padding: 40px 80px 40px 40px;

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
  return (
    <Summary>
      <Column>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
        <P>{RichText.render(props.doc.data.about_content)}</P>
      </Column>
      <Top>
        <Img src={props.doc.data.about_image.url} />
      </Top>
    </Summary>
  );
}

export default HomeSummary;
