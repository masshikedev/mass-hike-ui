import React from 'react';
import styled from 'styled-components';
import { MediaQueries, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const StatItem = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

function ImpactStats(props) {
  return (
    <GridParent>
      <StatItem>
        <Img src={props.doc.data.stat_image1.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text1)}</StatItem>
      <StatItem>
        <Img src={props.doc.data.stat_image2.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text2)}</StatItem>
      <StatItem>
        <Img src={props.doc.data.stat_image3.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text3)}</StatItem>
    </GridParent>
  );
}

export default ImpactStats;
