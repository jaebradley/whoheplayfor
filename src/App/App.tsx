import * as React from 'react';
import { useRecoilState, atom } from 'recoil/dist';

import PlayerImage from '@App/PlayerImage';
import useFetchPlayers from '@App/hooks/useFetchPlayers';
import selectRandomPlayer from '@App/selectRandomPlayer';
import { Player } from '@Src/types';

import Header from './Header';

function App(): React.ReactElement {
  const playerState = atom({
    key: 'playerState',
    default: null,
  });
  const [player, setPlayer] = useRecoilState<Player | null>(playerState);
  const { loading, error, players } = useFetchPlayers();

  React.useEffect(() => {
    const player = selectRandomPlayer({ players, difficultyLevel: 'ALL' });
    if (player) {
      setPlayer(player);
    }
  });

  const handleSelectClick = React.useCallback(() => {
    const player = selectRandomPlayer({ players, difficultyLevel: 'ALL' });
    if (player) {
      setPlayer(player);
    }
  }, [setPlayer, players]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Header />
      <button onClick={handleSelectClick}>Select</button>
      {player && <PlayerImage playerId={player.id} />}
      {player && <div>{player.name}</div>}
    </div>
  );
}

export default App;
