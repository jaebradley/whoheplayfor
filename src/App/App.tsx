import * as React from 'react';

import Header from './Header';
import PlayerImage from '@App/PlayerImage';

import useFetchPlayers from '@App/hooks/useFetchPlayers';
import selectRandomPlayer from '@App/selectRandomPlayer';

function App(): React.ReactElement {
  const { loading, error, players } = useFetchPlayers();
  const player = selectRandomPlayer({ players, difficultyLevel: 'ALL' });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Header />
      <PlayerImage playerId={player.id} />
      <div>{player.name}</div>
    </div>
  );
}

export default App;
