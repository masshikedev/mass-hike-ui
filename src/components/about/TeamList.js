import React, { Component } from 'react';
import TeamMember from './TeamMember';
import { P, GridParent, constants, MediaQueries } from '../../style';

const Members = GridParent.extend`
  grid-gap: 5px;
  padding: 0 40px;

  ${MediaQueries.small} {
    grid-gap: 0;
  }
`;

const Title = P.extend`
  text-align: center;
  padding: 20px 0;
`;

class TeamList extends Component {
  static pageType = 'about';

  render() {
    return (
      <div>
        <Title size="xlarge" proxima bold>
          Our Team
        </Title>
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
