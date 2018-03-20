import React from 'react';
import { Img } from '../../style';
import styled from 'styled-components';

const Social = styled.div`
  display: grid;
  grid-column: span 2;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
`;

function SocialMedia(props) {
  return (
    <Social>
      <a href="http://twitter.com">
        <Img src={props.url} />
      </a>
      <a href="http://twitter.com">
        <Img src={props.url} />
      </a>
      <a href="http://twitter.com">
        <Img src={props.url} />
      </a>
      <a href="http://twitter.com">
        <Img src={props.url} />
      </a>
    </Social>
  );
}

export default SocialMedia;
