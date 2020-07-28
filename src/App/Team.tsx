import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil/dist';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_check } from 'react-icons-kit/md/ic_check';

import TeamLogo from '@App/TeamLogo';
import { Team } from '@Src/types';
import { selectedTeamState, selectionConfirmationState } from '@App/atoms';

function Team({ team }: { team: Team }): React.ReactElement {
  const [isFocused, setIsFocused] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = useRecoilState<Team | null>(selectedTeamState);
  const setSelectionConfirmation = useSetRecoilState(selectionConfirmationState);
  const handleClick = React.useCallback(() => {
    if (!selectedTeam || (selectedTeam && team.id != selectedTeam.id)) {
      setSelectedTeam(team);
      setSelectionConfirmation(false);
    }
  }, [selectedTeam, setSelectedTeam, team]);
  const handleConfirmationClick = React.useCallback(()=> {
    setSelectionConfirmation(true);
  }, [setSelectionConfirmation]);
  const isSelected = React.useMemo(() => !!selectedTeam && selectedTeam.id === team.id, [selectedTeam, team]);
  return (
    <StyledTeam>
      <StyledTeamLogoWrapper
        isSelected={isSelected}
        onMouseEnter={() => {
          setIsFocused(true);
        }}
        onMouseLeave={() => {
          setIsFocused(false);
        }}
      >
        <StyledTeamLogo isFocused={isFocused} team={team} size="3rem" onClick={handleClick} isSelected={isSelected} />
        {!isSelected && (
          <StyledTeamNameWrapper isFocused={isFocused} onClick={handleClick}>
            <StyledTeamName>{team.name}</StyledTeamName>
          </StyledTeamNameWrapper>
        )}
      </StyledTeamLogoWrapper>
      {isSelected && (
        <StyledIconWrapper>
          <Icon icon={ic_check} onClick={handleConfirmationClick} />
        </StyledIconWrapper>
      )}
    </StyledTeam>
  );
}

const StyledTeam = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTeamLogo = styled(TeamLogo)<{ isSelected: boolean; isFocused: boolean }>`
  opacity: ${({ isSelected, isFocused }) => (isSelected || isFocused ? '0.1' : null)};
`;

const StyledTeamNameWrapper = styled.div<{ isFocused: boolean }>`
  // https://stackoverflow.com/a/14263847/5225575
  bottom: 0;
  font-size: 0.1rem;
  height: 3rem;
  left: 0;
  margin: 0;
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  transition: opacity 0.2s, visibility 0.2s;
  visibility: ${({ isFocused }) => (isFocused ? 'visible' : 'hidden')};
  width: 3rem;
  // https://stackoverflow.com/a/10831230/5225575
  word-spacing: 3rem;
`;

const StyledTeamName = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
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
