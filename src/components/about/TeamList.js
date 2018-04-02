import React, { Component } from 'react';
import TeamMember from './TeamMember';
import { P, GridParent, MediaQueries } from '../../style';

const Members = GridParent.extend`
  grid-gap: 5px;

  ${MediaQueries.small} {
    grid-gap: 0;
  }
`;

const Title = P.extend`
  text-align: center;
  padding-top: 20px;
`;

class TeamList extends Component {
  static pageType = 'about';

  render() {
    return (
      <div>
        <Title xxlarge proxima bold>
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
