import * as React from 'react';
import styled from 'styled-components';
import PlayerImage from '@App/PlayerImage';
import { Player } from '@Src/types';
import { PlayerIteratorResult } from '@Src/makePlayersIterator';
import { set } from 'idb-keyval';
import seenPlayersStore from '@Src/seenPlayersStore';
import generatePlayerImageURL from '@App/generatePlayerImageURL';
import { useRecoilState } from 'recoil/dist';
import { useLocalStorage } from '@rehooks/local-storage';
import { playerState } from '@App/atoms';
import shuffle from '@Src/shuffle';
import useGetNextPlayer from '@App/hooks/useGetNextPlayer';
import { ThemeInterface } from '@App/styles/theme';
import { Icon } from 'react-icons-kit';
import { ic_skip_next } from 'react-icons-kit/md/ic_skip_next';

type PlayerProps = {
  players: Array<Player>;
};

function Player({ players }: PlayerProps): React.ReactElement {
  const [isFocused, setIsFocused] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = useLocalStorage<Player>('currentPlayer');
  const [player, setPlayer] = useRecoilState<Player | null>(playerState);
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
          .then(() => setIsFocused(false))
          .catch((e) => console.log('unable to set player in index db', currentPlayer, e));
      }
    });
  }, [getNextPlayer, setPlayer, setCurrentPlayer]);

  if (!player) {
    return <div />;
  }

  return (
    <StyledPlayer>
      <StyledImageWrapper
        onMouseEnter={() => {
          setIsFocused(true);
        }}
        onMouseLeave={() => {
          setIsFocused(false);
        }}
      >
        <StyledPlayerImage playerId={player.id} isFocused={isFocused} />
        <StyledNext size="2rem" onClick={handleSelectClick} icon={ic_skip_next} isFocused={isFocused} />
      </StyledImageWrapper>
      <StyledName>{player.name}</StyledName>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledImageWrapper = styled.div`
  position: relative;
`;

const StyledPlayerImage = styled(PlayerImage)<{ isFocused: boolean }>`
  opacity: ${({ isFocused }) => (isFocused ? '0.1' : null)};
`;

const StyledNext = styled(Icon)<{ isFocused: boolean; theme: ThemeInterface }>`
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  color: ${({ theme }) => theme.primary};
  left: 4rem;
  position: absolute;
  top: 2rem;
  visibility: ${({ isFocused }) => (isFocused ? 'visible' : 'hidden')};
`;

const StyledName = styled.h5<{ theme: ThemeInterface }>`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
`;

export default Player;
