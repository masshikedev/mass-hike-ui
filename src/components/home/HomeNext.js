import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Button, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function HomeNext(props) {
  return (
    <GridParent>
      <Column>
        <H2>Next Trip</H2>
      </Column>
      <Column>{RichText.render(props.doc.data.next_trip)}</Column>
      <Column>
        <Button>Book this hike</Button>
      </Column>
    </GridParent>
  );
}

export default HomeNext;
