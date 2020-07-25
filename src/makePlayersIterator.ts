import { get } from 'idb-keyval';

import seenPlayersStore from '@Src/seenPlayersStore';
import { Player } from '@Src/types';

interface PlayerIteratorResult {
  currentPlayer: Player | null;
  nextPlayer: Player | null;
}

const EMPTY_VALUE: PlayerIteratorResult = {
  currentPlayer: null,
  nextPlayer: null,
};

function* makePlayersIterator({
  players,
}: {
  players: Array<Player>;
}): Generator<Promise<PlayerIteratorResult>, PlayerIteratorResult> {
  for (let index = 0; index < players.length; index++) {
    const currentPlayer = players[index];

    yield get(currentPlayer.id, seenPlayersStore)
      .then((value) => {
        if (!value) {
          return {
            currentPlayer: players[index],
            nextPlayer: players[index + 1],
          };
        }

        return EMPTY_VALUE;
      })
      .catch((e) => {
        console.log('issue iterating players', e);
        return EMPTY_VALUE;
      });
  }

  return EMPTY_VALUE;
}

export { PlayerIteratorResult };
export default makePlayersIterator;
