import * as React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_error } from 'react-icons-kit/md/ic_error';
import { ic_thumb_up } from 'react-icons-kit/md/ic_thumb_up';

import correctSelectionImages from '@Src/correctSelectionImageURLs';
import incorrectSelectionImages from '@Src/incorrectSelectionImageURLs';
import { Player, Team } from '@Src/types';
import TEAMS from '@Src/teams';

import { playerState, selectedTeamState, selectionConfirmationState } from '@App/atoms';
import useDetectClickOutsideComponent from '@App/hooks/useDetectClickOutsideComponent';

function Result({ onClose }: { onClose: () => void }): React.ReactElement {
  const resultRef = React.useRef<HTMLDialogElement>(null);
  const [selectionConfirmation, setSelectionConfirmation] = useRecoilState<boolean>(selectionConfirmationState);
  const player = useRecoilValue<Player | null>(playerState);
  const selectedTeam = useRecoilValue<Team | null>(selectedTeamState);
  const selectionResult: boolean = React.useMemo(() => {
    if (!player || !selectedTeam) {
      return false;
    }

    return player.teamAbbreviation === selectedTeam.abbreviation;
  }, [player, selectedTeam]);
  const playerTeam: Team | undefined = React.useMemo<Team | undefined>(() => {
    return Array.from(TEAMS.values()).find((team) => team.abbreviation === player?.teamAbbreviation);
  }, [player?.teamAbbreviation]);

  const handleClose = React.useCallback(() => {
    setSelectionConfirmation(false);
    onClose();
  }, [setSelectionConfirmation, onClose]);

  useDetectClickOutsideComponent({ ref: resultRef, onClick: handleClose });

  const imageURL: string = selectionResult
    ? correctSelectionImages[Math.floor(Math.random() * correctSelectionImages.length)]
    : incorrectSelectionImages[Math.floor(Math.random() * incorrectSelectionImages.length)];
  const playerTeamMessage = `${player?.name} plays for the ${playerTeam?.name}${
    selectionResult && selectedTeam ? '' : `, not the ${selectedTeam?.name}`
  }`;

  return (
    <StyledResult ref={resultRef} open={selectionConfirmation} result={selectionResult}>
      <StyledContents>
        <StyledHeader>
          <Icon size="1.5rem" icon={selectionResult ? ic_thumb_up : ic_error} />
          <StyledClose size="1.5rem" icon={ic_close} onClick={handleClose} />
        </StyledHeader>
        <StyledDescription>
          <StyledMessage>{playerTeamMessage}</StyledMessage>
          <StyledImage src={imageURL} />
        </StyledDescription>
      </StyledContents>
    </StyledResult>
  );
}

const StyledResult = styled.dialog<{ result: boolean }>`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ result, theme }) => (result ? theme.secondary : 'red')};
  left: 50%;
  margin: 0;
  width: 20rem;
  height: 20rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const StyledContents = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledClose = styled(Icon)`
  cursor: pointer;
`;

const StyledImage = styled.img`
  max-height: 15rem;
  max-width: 15rem;
`;

const StyledDescription = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const StyledMessage = styled.p`
  text-align: center;
`;

export default Result;
