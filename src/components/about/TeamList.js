import React, { Component } from 'react';
import TeamMember from './TeamMember';
import { GridParent } from '../../style';

function TeamList(props) {
  return <GridParent>{renderTeamMembers(props)}</GridParent>;
}

function renderTeamMembers(props) {
  const body = props.body;

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

export default TeamList;
