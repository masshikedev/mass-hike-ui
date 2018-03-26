import React from 'react';
import styled from 'styled-components';
import { H4, H6, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Member = styled.div`
  grid-column: span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

function TeamMember(props) {
  return (
    <Member>
      <Img src={props.headshot.url} />
      <H6>{RichText.asText(props.name)}</H6>
      <H4>{RichText.asText(props.position)}</H4>
      <div>{RichText.asText(props.desc)}</div>
    </Member>
  );
}

export default TeamMember;
