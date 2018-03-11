import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, P, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const StatItem = styled.div`
  grid-column: span 6;
`;

function ImpactStats(props) {
  return (
    <GridParent>
      <StatItem>
        <Img src={props.doc.data.impact_image1.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text1)}</StatItem>
      <StatItem>
        <Img src={props.doc.data.impact_image1.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text2)}</StatItem>
      <StatItem>
        <Img src={props.doc.data.impact_image1.url} />
      </StatItem>
      <StatItem>{RichText.render(props.doc.data.stat_text3)}</StatItem>
    </GridParent>
  );
}

export default ImpactStats;
