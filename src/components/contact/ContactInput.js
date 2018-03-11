import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, H2, H6, P, Img, Input, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

const ExtendInput = Input.extend`
  height: 300px;
`;

function ContactInput(props) {
  return (
    <GridParent>
      <Column>
        <label>
          <H6>{RichText.asText(props.doc.data.field1)}</H6>
          <Input type="text" />
        </label>
        <label>
          <H6>{RichText.asText(props.doc.data.field2)}</H6>
          <Input type="text" />
        </label>
        <label>
          <H6>{RichText.asText(props.doc.data.field3)}</H6>
          <ExtendInput type="text" />
        </label>
      </Column>
    </GridParent>
  );
}

export default ContactInput;
