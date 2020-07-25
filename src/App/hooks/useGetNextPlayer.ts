import * as React from 'react';
import { Player } from '@Src/types';
import makePlayersIterator, { PlayerIteratorResult } from '@Src/makePlayersIterator';
import { clear } from 'idb-keyval';
import seenPlayersStore from '@Src/seenPlayersStore';

function useGetNextPlayer({ players }: { players: Array<Player> }): () => Promise<void | PlayerIteratorResult> {
  const playersIterator = React.useRef(makePlayersIterator({ players }));

  const getNextPlayer: () => Promise<void | PlayerIteratorResult> = React.useCallback(() => {
    const next = playersIterator.current.next();
    if (next.done) {
      return clear(seenPlayersStore)
        .then(() => {
          playersIterator.current = makePlayersIterator({ players });
          return getNextPlayer();
        })
        .catch((e) => console.log('error when resetting store', e));
    }
    return next.value.then((result) => {
      if (!result?.currentPlayer) {
        return getNextPlayer();
      } else {
        return result;
      }
    });
  }, [players, playersIterator]);

  React.useEffect(() => {
    playersIterator.current = makePlayersIterator({ players });
  }, [players]);

  return getNextPlayer;
}

export default useGetNextPlayer;
