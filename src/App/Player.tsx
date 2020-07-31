import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_chevron_right } from 'react-icons-kit/md/ic_chevron_right';
import { useRecoilState } from 'recoil';
import { useLocalStorage } from '@rehooks/local-storage';
import { set } from 'idb-keyval';

import seenPlayersStore from '@Src/seenPlayersStore';
import { Player } from '@Src/types';
import { PlayerIteratorResult } from '@Src/makePlayersIterator';
import shuffle from '@Src/shuffle';

import PlayerImage from '@App/PlayerImage';
import generatePlayerImageURL from '@App/generatePlayerImageURL';
import useGetNextPlayer from '@App/hooks/useGetNextPlayer';
import { ThemeInterface } from '@App/styles/theme';
import { playerSelector } from '@App/selectors';

type PlayerProps = {
  players: Array<Player>;
};

function Player({ players }: PlayerProps): React.ReactElement {
  const [currentPlayer, setCurrentPlayer] = useLocalStorage<Player>('currentPlayer');
  const [player, setPlayer] = useRecoilState<Player | null>(playerSelector);
  const shuffledPlayers = React.useMemo(() => shuffle(players), [players]);
  const getNextPlayer = useGetNextPlayer({ players: shuffledPlayers });

  React.useEffect(() => {
    if (currentPlayer && !player) {
      try {
        setPlayer(currentPlayer);
      } catch (e) {
        console.log('error', e, currentPlayer);
      }
    } else if (!player) {
      handleSelectClick();
    }
  });

  const handleSelectClick = React.useCallback(() => {
    getNextPlayer().then(({ currentPlayer, nextPlayer }: PlayerIteratorResult) => {
      if (currentPlayer) {
        set(currentPlayer.id, currentPlayer.name, seenPlayersStore)
          .then(() => {
            if (nextPlayer) {
              new Image().src = generatePlayerImageURL({ playerId: nextPlayer.id });
            }
          })
          .then(() => setCurrentPlayer(currentPlayer))
          .then(() => setPlayer(currentPlayer))
          .catch((e) => console.log('unable to set player in index db', currentPlayer, e));
      }
    });
  }, [getNextPlayer, setPlayer, setCurrentPlayer]);

  if (!player) {
    return <div />;
  }

  return (
    <StyledPlayer>
      <StyledPlayerDetails>
        <PlayerImage playerId={player.id} />
        <StyledName>{player.name}</StyledName>
      </StyledPlayerDetails>
      <div>
        <Icon size="2rem" onClick={handleSelectClick} icon={ic_chevron_right} />
      </div>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  align-items: center;
  display: flex;
`;

const StyledPlayerDetails = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 10rem;
  width: 10rem;
  justify-content: center;
`;

const StyledName = styled.h5<{ theme: ThemeInterface }>`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  text-align: center;
`;

export default Player;
