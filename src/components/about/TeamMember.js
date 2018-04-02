import React from 'react';
import styled from 'styled-components';
import { P, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Member = styled.div`
  grid-column: span 4;
  padding: 20px 40px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Headshot = Img.extend`
  border-radius: 100%;
`;

function TeamMember(props) {
  return (
    <Member>
      <Headshot src={props.headshot.url} />
      <ul>
        <li>
          <P proxima bold uppercase yellow>
            {RichText.asText(props.name)}
          </P>
        </li>
      </ul>
      <P proxima bold uppercase green>
        {RichText.asText(props.position)}
      </P>
      <P small>{RichText.asText(props.desc)}</P>
    </Member>
  );
}

export default TeamMember;
