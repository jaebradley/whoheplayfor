import * as React from 'react';
import styled from 'styled-components';

import TEAMS from '@Src/teams';
import TeamLogo from '@App/TeamLogo';

function Teams(): React.ReactElement {
  return (
    <StyledTeams>
      {Array.from(TEAMS.entries()).map(([, team]) => (
        <TeamLogo key={team.id} team={team} size="5rem" />
      ))}
    </StyledTeams>
  );
}

const StyledTeams = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
`;

export default Teams;
