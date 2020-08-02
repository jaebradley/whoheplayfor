import * as React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_close } from 'react-icons-kit/md/ic_close';

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
  const resultMessage: string = selectionResult ? 'You got it right!' : 'You got it wrong!';
  const playerTeamMessage = `${player?.name} plays for the ${playerTeam?.name}`;

  return (
    <StyledResult ref={resultRef} open={selectionConfirmation}>
      <StyledContents>
        <StyledHeader>
          <StyledIcon size="1.5rem" icon={ic_close} onClick={handleClose} />
        </StyledHeader>
        <p>{resultMessage}</p>
        <p>{playerTeamMessage}</p>
        <StyledImage src={imageURL} />
      </StyledContents>
    </StyledResult>
  );
}

const StyledResult = styled.dialog`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 1;
`;

const StyledContents = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

const StyledImage = styled.img`
  max-height: 15rem;
  max-width: 15rem;
`;

export default Result;
