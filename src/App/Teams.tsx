import * as React from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { useRecoilValue } from 'recoil';

import TEAMS from '@Src/teams';
import Team from '@App/Team';
import Search from '@App/Search';
import { searchTermState } from '@App/atoms';

const TEAM_VALUES = Array.from(TEAMS.entries()).map(([, team]) => team);
const fuse = new Fuse(TEAM_VALUES, { keys: ['name', 'abbreviation'] });

function Teams(): React.ReactElement {
  const searchTerm = useRecoilValue<string | null>(searchTermState);

  const filteredTeams = React.useMemo(() => {
    if (searchTerm && searchTerm.trim()) {
      return fuse.search(searchTerm).map((match) => ({
        ...match.item,
      }));
    }

    return TEAM_VALUES;
  }, [searchTerm]);

  return (
    <StyledTeamsWrapper>
      <Search />
      <StyledTeamListWrapper>
        <StyledTeams>
          {Array.from(TEAMS.entries()).map(([, team]) => (
            <Team
              key={team.id}
              team={team}
              isDisabled={!filteredTeams.length || filteredTeams.every((filteredTeam) => filteredTeam.id !== team.id)}
            />
          ))}
        </StyledTeams>
      </StyledTeamListWrapper>
    </StyledTeamsWrapper>
  );
}

const StyledTeamsWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledTeamListWrapper = styled.div`
  padding-left: 2rem;
  width: 100%;
`;

const StyledTeams = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 4rem);
  grid-gap: 1.5rem;
`;

export default Teams;
