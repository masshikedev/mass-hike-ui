import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Button, Img } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const Content = styled.div``;

function HomeNext(props) {
  return (
    <Wrapper>
      <H2>Next Trip</H2>
      <Content>{RichText.render(props.doc.data.next_trip)}</Content>
      <Button>Book this hike</Button>
    </Wrapper>
  );
}

export default HomeNext;
