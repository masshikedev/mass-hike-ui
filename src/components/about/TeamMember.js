import React from 'react';
import styled from 'styled-components';
import { P, Img, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Member = styled.div`
  grid-column: span 4;

  ${MediaQueries.medium} {
    grid-column: span 6;
  }

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Headshot = Img.extend`
  border-radius: 100%;
`;

const HeadshotWrapper = styled.div`
  padding: 0 10%;
`;

const NameWrapper = styled.ul`
  list-style-position: outside;
`;

const Name = P.extend`
  margin-bottom: 0;
`;

const Text = styled.div`
  padding: 20px 40px 70px;

  ${MediaQueries.small} {
    padding: 20px 10px 70px;
  }
`;

function TeamMember(props) {
  return (
    <Member>
      <HeadshotWrapper>
        <Headshot src={props.headshot.url} />
      </HeadshotWrapper>
      <Text>
        <NameWrapper>
          <li>
            <Name proxima bold uppercase color="yellow">
              {RichText.asText(props.name)}
            </Name>
          </li>
        </NameWrapper>
        <P proxima bold uppercase color="green">
          {RichText.asText(props.position)}
        </P>
        <P medium>{RichText.asText(props.desc)}</P>
      </Text>
    </Member>
  );
}

export default TeamMember;
