import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, H2, P, Img, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function ContactMain(props) {
  return (
    <GridParent>
      <Column>
        <H1>{RichText.asText(props.doc.data.title)}</H1>
        <div>{RichText.render(props.doc.data.contact_content)}</div>
      </Column>
    </GridParent>
  );
}

export default ContactMain;
