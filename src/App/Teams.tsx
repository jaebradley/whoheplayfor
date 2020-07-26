import * as React from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';

import TEAMS from '@Src/teams';
import Team from '@App/Team';

const TEAM_VALUES = Array.from(TEAMS.entries()).map(([, team]) => team);
const fuse = new Fuse(TEAM_VALUES, { keys: ['name', 'abbreviation'] });

function Teams(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTeams = React.useMemo(() => {
    if (searchTerm.trim()) {
      return fuse.search(searchTerm).map((match) => ({
        ...match.item,
      }));
    }

    return TEAM_VALUES;
  }, [searchTerm]);

  const handleSearchTermChange = React.useCallback((event) => setSearchTerm(event.target.value), [setSearchTerm]);

  return (
    <div>
      <input type="text" onChange={handleSearchTermChange} />
      <StyledTeams>
        {filteredTeams.map((team) => (
          <Team key={team.id} team={team} />
        ))}
      </StyledTeams>
    </div>
  );
}

const StyledTeams = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
`;

export default Teams;
