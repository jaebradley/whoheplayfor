import * as React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import correctSelectionImages from '@Src/correctSelectionImageURLs';
import incorrectSelectionImages from '@Src/incorrectSelectionImageURLs';
import { Player, Team } from '@Src/types';
import TEAMS from '@Src/teams';

import { playerState, selectedTeamState } from '@App/atoms';

const Result: React.FunctionComponent = () => {
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
  const imageURL: string = selectionResult
    ? correctSelectionImages[Math.floor(Math.random() * correctSelectionImages.length)]
    : incorrectSelectionImages[Math.floor(Math.random() * incorrectSelectionImages.length)];
  const resultMessage: string = selectionResult ? 'You got it right!' : 'You got it wrong!';
  const playerTeamMessage = `${player?.name} plays for the ${playerTeam?.name}`;

  return (
    <StyledResult>
      <p>{resultMessage}</p>
      <p>{playerTeamMessage}</p>
      <StyledImage src={imageURL} />
    </StyledResult>
  );
};

const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-height: 15rem;
  max-width: 15rem;
`;

export default Result;
