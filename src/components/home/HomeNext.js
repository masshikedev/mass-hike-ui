import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Button, Img } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
`;

const Content = styled.div``;

const Circle = styled.div`
  border: solid;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

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
