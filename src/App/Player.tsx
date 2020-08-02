import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_fast_forward } from 'react-icons-kit/md/ic_fast_forward';
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
  const [isSkipFocused, setIsSkipFocused] = React.useState(false);

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

  const handleFocusSkip = React.useCallback(() => {
    setIsSkipFocused(true);
  }, [setIsSkipFocused]);

  const handleBlurSkip = React.useCallback(() => {
    setIsSkipFocused(false);
  }, [setIsSkipFocused]);

  if (!player) {
    return <div />;
  }

  return (
    <StyledPlayer>
      <StyledPlayerDetails>
        <PlayerImage playerId={player.id} />
        <StyledName>{player.name}</StyledName>
        <div
          onMouseEnter={handleFocusSkip}
          onMouseLeave={handleBlurSkip}
          onFocus={handleFocusSkip}
          onBlur={handleBlurSkip}
        >
          <StyledFastForward size="2rem" onClick={handleSelectClick} icon={ic_fast_forward} isFocused={isSkipFocused} />
        </div>
      </StyledPlayerDetails>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledPlayerDetails = styled.div`
  align-items: center;
  background-color: moccasin;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 11rem;
  width: 11rem;
  justify-content: center;
`;

const StyledName = styled.h5<{ theme: ThemeInterface }>`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  text-align: center;
`;

const StyledFastForward = styled(Icon)<{ isFocused: boolean }>`
  color: ${({ theme }) => theme.primary};
  opacity: ${({ isFocused }) => (isFocused ? null : 0.3)};
`;

export default Player;
