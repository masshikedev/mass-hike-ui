import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, H2, H3, Img, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Member = styled.div`
  grid-column: span 4;
`;

function TeamMember(props) {
  console.log(props);
  return (
    <Member>
      <Img src={props.headshot.url} />
      <H3>{RichText.render(props.name)}</H3>
      <div>{RichText.render(props.desc)}</div>
    </Member>
  );
}

export default TeamMember;
