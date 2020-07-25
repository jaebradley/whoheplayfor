import * as React from 'react';
import { useRecoilState, atom } from 'recoil/dist';
import styled from 'styled-components';
import { set } from 'idb-keyval';

import PlayerImage from '@App/PlayerImage';
import useFetchPlayers from '@App/hooks/useFetchPlayers';
import useGetNextPlayer from '@App/hooks/useGetNextPlayer';

import { Player } from '@Src/types';
import seenPlayersStore from '@Src/seenPlayersStore';
import shuffle from '@Src/shuffle';

import Header from './Header';
import Teams from './Teams';
import generatePlayerImageURL from '@App/generatePlayerImageURL';
import { PlayerIteratorResult } from '@Src/makePlayersIterator';

function App(): React.ReactElement {
  const playerState = atom({
    key: 'playerState',
    default: null,
  });
  const [player, setPlayer] = useRecoilState<Player | null>(playerState);
  const { loading, error, players } = useFetchPlayers();
  const shuffledPlayers = React.useMemo(() => shuffle(players), [players]);
  const getNextPlayer = useGetNextPlayer({ players: shuffledPlayers });

  const handleSelectClick = React.useCallback(() => {
    getNextPlayer().then(({ currentPlayer, nextPlayer }: PlayerIteratorResult) => {
      if (currentPlayer) {
        set(currentPlayer.id, currentPlayer.name, seenPlayersStore)
          .then(() => {
            if (nextPlayer) {
              new Image().src = generatePlayerImageURL({ playerId: nextPlayer.id });
            }
          })
          .then(() => setPlayer(currentPlayer))
          .catch((e) => console.log('unable to set player in index db', currentPlayer, e));
      }
    });
  }, [getNextPlayer, setPlayer]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <StyledApp>
      <StyledHeader />
      <StyledContent>
        <div>
          <button onClick={handleSelectClick}>Select</button>
          {player && <PlayerImage playerId={player.id} />}
          {player && <div>{player.name}</div>}
        </div>
        <Teams />
      </StyledContent>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const StyledContent = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
`;

const StyledHeader = styled(Header)`
  grid-column: 1/-1;
  place-items: center;
  text-align: center;
`;

export default App;
