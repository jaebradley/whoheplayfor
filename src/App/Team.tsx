import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil/dist';
import styled, { css } from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_check } from 'react-icons-kit/md/ic_check';

import TeamLogo from '@App/TeamLogo';
import { Team } from '@Src/types';
import { selectedTeamState, selectionConfirmationState } from '@App/atoms';
import useDetectClickOutsideComponent from '@App/hooks/useDetectClickOutsideComponent';

function Team({ team, isDisabled }: { team: Team; isDisabled: boolean }): React.ReactElement {
  const teamRef = React.useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);

  const [selectedTeam, setSelectedTeam] = useRecoilState<Team | null>(selectedTeamState);
  const setSelectionConfirmation = useSetRecoilState(selectionConfirmationState);

  const isSelected = React.useMemo(() => !!selectedTeam && selectedTeam.id === team.id, [selectedTeam, team]);

  const handleClick = React.useCallback(() => {
    if (!selectedTeam || (selectedTeam && team.id != selectedTeam.id)) {
      setSelectedTeam(team);
      setSelectionConfirmation(false);
    }
  }, [selectedTeam, setSelectedTeam, team, setSelectionConfirmation]);

  const handleConfirmationClick = React.useCallback(() => {
    setSelectionConfirmation(true);
  }, [setSelectionConfirmation]);

  const handleIsFocused = React.useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleIsBlurred = React.useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  useDetectClickOutsideComponent({ ref: teamRef, onClick: handleIsBlurred });

  return (
    <StyledTeam ref={teamRef} isDisabled={isDisabled} role="button" tabIndex={isDisabled ? undefined : 0}>
      <StyledTeamLogoWrapper
        isSelected={isSelected}
        onFocus={handleIsFocused}
        onBlur={handleIsBlurred}
        onMouseEnter={handleIsFocused}
        onMouseLeave={handleIsBlurred}
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
          <Icon size="1.5rem" icon={ic_check} onClick={handleConfirmationClick} />
        </StyledIconWrapper>
      )}
    </StyledTeam>
  );
}

const StyledTeam = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  align-content: center;
  background-color: moccasin;
  border-radius: 50%;
  display: flex;
  height: 4rem;
  justify-content: center;
  position: relative;
  width: 4rem;

  @media (min-width: 320px) {
    display: ${({ isDisabled }) => (isDisabled ? 'none' : null)};
  }

  @media (min-width: 641px) {
    display: inherit;
  }

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;

const StyledTeamLogo = styled(TeamLogo)<{ isSelected: boolean; isFocused: boolean }>`
  opacity: ${({ isSelected, isFocused }) => (isSelected || isFocused ? '0.1' : null)};
`;

const StyledTeamNameWrapper = styled.div<{ isFocused: boolean }>`
  // https://stackoverflow.com/a/14263847/5225575
  bottom: 0;
  font-size: 0.1rem;
  height: 4rem;
  left: 0;
  margin: 0;
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0)};
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  transition: opacity 0.2s, visibility 0.2s;
  visibility: ${({ isFocused }) => (isFocused ? 'visible' : 'hidden')};
  width: 4rem;
  // https://stackoverflow.com/a/10831230/5225575
  word-spacing: 3rem;
`;

const StyledTeamName = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.primary};
  display: flex;
  font-weight: bolder;
  height: 100%;
  position: relative;
`;

const StyledTeamLogoWrapper = styled.div<{ isSelected: boolean }>`
  align-items: center;
  border: ${({ isSelected }) => (isSelected ? '2px solid green' : null)};
  border-radius: 50%;
  display: flex;
  height: 4rem;
  justify-content: center;
  width: 4rem;
`;

const StyledIconWrapper = styled.div`
  color: green;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
`;

export default Team;
