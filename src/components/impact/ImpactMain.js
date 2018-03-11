import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, P, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

const ImpactImg = styled.div`
  grid-column: span 4;
`;

function ImpactMain(props) {
  return (
    <GridParent>
      <Column>
        <H1>{RichText.asText(props.doc.data.impact_title)}</H1>
        <div>{RichText.render(props.doc.data.main_content)}</div>
      </Column>
      <ImpactImg>
        <Img src={props.doc.data.impact_image1.url} />
      </ImpactImg>
      <ImpactImg>
        <Img src={props.doc.data.impact_image1.url} />
      </ImpactImg>
      <ImpactImg>
        <Img src={props.doc.data.impact_image1.url} />
      </ImpactImg>
    </GridParent>
  );
}

export default ImpactMain;
