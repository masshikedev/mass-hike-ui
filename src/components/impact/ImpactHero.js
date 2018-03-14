import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, P, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

const HeroText = styled.div``;

function ImpactHero(props) {
  return (
    <GridParent>
      <Column>
        <HeroText>{RichText.render(props.doc.data.impact_hero_text)}</HeroText>
      </Column>
    </GridParent>
  );
}

export default ImpactHero;
