import React from 'react';
import styled from 'styled-components';
import { H2, Button, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

function HomeNext(props) {
  console.log(props);
  return (
    <GridParent>
      <Column>
        <H2>Next Trip</H2>
      </Column>
      <Column>
        <Img src={props.doc.data.next_trip_image.url} />
      </Column>
      <Column>{RichText.render(props.doc.data.next_trip)}</Column>
      <Column>
        <Button>Book this hike</Button>
      </Column>
    </GridParent>
  );
}

export default HomeNext;
