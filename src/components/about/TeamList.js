import React, { Component } from 'react';
import TeamMember from './TeamMember';
import { H2, GridParent } from '../../style';

class TeamList extends Component {
  static pageType = 'about';

  render() {
    return (
      <div>
        <H2>Our Team</H2>
        <GridParent>{this.renderTeamMembers()}</GridParent>
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
    });
    return teamComponents;
  }
}

export default TeamList;
