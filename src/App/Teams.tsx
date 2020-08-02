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

function Teams({ isDisabled }: { isDisabled: boolean }): React.ReactElement {
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
    <StyledTeamsWrapper isDisabled={isDisabled}>
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

const StyledTeamsWrapper = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 'none')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};
`;

const StyledTeamListWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;

  @media (min-width: 320px) {
    max-height: 17rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (min-width: 641px) {
    max-height: initial;
    overflow-y: initial;
    overflow-x: initial;
  }
`;

const StyledTeams = styled.div`
  display: grid;
  grid-gap: 2rem;

  // https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile
  @media (min-width: 320px) {
    grid-template-columns: repeat(3, 4rem);
  }

  @media (min-width: 641px) {
    grid-template-columns: repeat(6, 4rem);
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(10, 4rem);
  }
`;

export default Teams;
