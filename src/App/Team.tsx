import * as React from 'react';
import { useRecoilState } from 'recoil/dist';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_check } from 'react-icons-kit/md/ic_check';

import TeamLogo from '@App/TeamLogo';
import { Team } from '@Src/types';
import { selectedTeamState } from '@App/atoms';

function Team({ team }: { team: Team }): React.ReactElement {
  const [selectedTeam, setSelectedTeam] = useRecoilState<Team | null>(selectedTeamState);
  const handleClick = React.useCallback(() => {
    if (!selectedTeam || (selectedTeam && team.id != selectedTeam.id)) {
      setSelectedTeam(team);
    }
  }, [selectedTeam, setSelectedTeam, team]);
  const isSelected = React.useMemo(() => !!selectedTeam && selectedTeam.id === team.id, [selectedTeam, team]);
  return (
    <StyledTeam>
      <StyledTeamLogoWrapper isSelected={isSelected}>
        <StyledTeamLogo team={team} size="3rem" onClick={handleClick} isSelected={isSelected} />
      </StyledTeamLogoWrapper>
      {isSelected && (
        <StyledIconWrapper>
          <Icon icon={ic_check} />
        </StyledIconWrapper>
      )}
    </StyledTeam>
  );
}

const StyledTeam = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTeamLogo = styled(TeamLogo)<{ isSelected: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? '0.1' : null)};
`;

const StyledTeamLogoWrapper = styled.div<{ isSelected: boolean }>`
  border: ${({ isSelected }) => (isSelected ? '1px solid green' : null)};
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;

const StyledIconWrapper = styled.div`
  color: green;
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export default Team;
