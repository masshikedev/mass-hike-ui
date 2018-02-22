import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Img } from '../../style';

const Details = styled.div`
  display: flex;
`;

const DetailItem = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

const Circle = styled.div`
  border: solid;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
function HomeDetails(props) {
  return (
    <Wrapper>
      <div>
        <H2>Here's how we can help.</H2>
        <Details>
          <DetailItem>
            <H3>Bus</H3>
            <P>Lorum ipsum blah blah hike bus good etc</P>
          </DetailItem>
          <DetailItem>
            <H3>Woods</H3>
            <P>Lorum ipsum blah blah hike bus good etc</P>
          </DetailItem>
          <DetailItem>
            <H3>Friends</H3>
            <P>Lorum ipsum blah blah hike bus good etc</P>
          </DetailItem>
        </Details>
      </div>
    </Wrapper>
  );
}

export default HomeDetails;
