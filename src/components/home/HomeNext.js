import React from 'react';
import styled from 'styled-components';
import { H2, H3, P, Button, Img } from '../../style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

const DetailItem = styled.div``;

const Circle = styled.div`
  border: solid;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

function HomeNext(props) {
  const { detail, time } = props;
  return (
    <Wrapper>
      <div>
        <H2>Next Trip</H2>
        <H3>Blue Hills</H3>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          porttitor diam. Cras vitae dui est. Vivamus odio nulla, porta ac purus
          ac, bibendum egestas sapien. In non suscipit mi. Quisque semper quam
          placerat, dapibus felis vel, viverra lacus. Phasellus tincidunt nisl
          eu velit imperdiet, sed lacinia sapien sagittis. Quisque efficitur sit
          amet enim non porttitor. Cras aliquam aliquam dolor vel maximus.
        </P>
        <Button>Book this hike</Button>
      </div>
    </Wrapper>
  );
}

export default HomeNext;
