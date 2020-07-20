import * as React from 'react';
import styled from 'styled-components';

import { Team } from '@Src/types';

function TeamLogo({ team, size = '3rem' }: { team: Team; size: string }): React.ReactElement {
  return (
    <StyledLogo
      alt={team.name}
      size={size}
      src={`https://stats.nba.com/media/img/teams/logos/${team.abbreviation}_logo.svg`}
    />
  );
}

const StyledLogo = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export default TeamLogo;
