import React, { Component } from 'react';
import TeamMember from './TeamMember';
import { P, GridParent, constants, HR, MediaQueries } from '../../style';
import styled from 'styled-components';

const Members = GridParent.extend`
  grid-gap: 5px;
  padding: 0 40px;

  ${MediaQueries.small} {
    grid-gap: 0;
  }
`;

const Title = P.extend`
  flex-shrink: 0;
  width: fit-content;
  margin: 0 10px;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  flex-grow: 0.5;
  :not(:first-child) {
    margin: 30px 0;
  }
`;
const Decoration = HR.extend`
  width: 33%;

  ${MediaQueries.small} {
    width: 0%;
  }
`;

class TeamList extends Component {
  static pageType = 'about';

  render() {
    return (
      <div>
        <TitleWrapper>
          <Decoration />
          <Title size="xlarge" proxima bold>
            Our Team
          </Title>
          <Decoration />
        </TitleWrapper>
        <Members>{this.renderTeamMembers()}</Members>
      </div>
    );
  }

  renderTeamMembers() {
    const body = this.props.body;

    const teamComponents = body.map((member, i) => {
      if (member.slice_type === 'team_member') {
        return (
          <TeamMember
            key={i}
            name={member.primary.name}
            desc={member.primary.description}
            position={member.primary.title}
            headshot={member.primary.headshot}
          />
        );
      }
      return null;
    });
    return teamComponents;
  }
}

export default TeamList;
