import React from 'react';
import styled from 'styled-components';
import { H1, Button } from '../../style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

function HomeMain(props) {
  return (
    <Wrapper>
      <div>
        <H1>Discover Nature</H1>
        <Button>Take a Hike</Button>
      </div>
    </Wrapper>
  );
}

export default HomeMain;
