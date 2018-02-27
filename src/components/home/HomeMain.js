import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function HomeMain(props) {
  return (
    <GridParent>
      <Column>
        <H1>{RichText.asText(props.doc.data.top_title)}</H1>
        <Button>
          <Link to="/trips">{RichText.asText(props.doc.data.main_cta)}</Link>
        </Button>
      </Column>
    </GridParent>
  );
}

export default HomeMain;
