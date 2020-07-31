import { selector } from 'recoil/dist';

import { playerState, selectedTeamState, searchTermState, selectionConfirmationState } from '@App/atoms';
import { Player, Team } from '@Src/types';

const resultSelector = selector<boolean | null>({
  key: 'resultSelector',
  get: ({ get }) => {
    const player: Player | null = get(playerState);
    const selectedTeam: Team | null = get(selectedTeamState);

    if (player && selectedTeam) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return player.teamAbbreviation === selectedTeam.abbreviation;
    }

    if (!player) {
      return null;
    }

    return false;
  },
});

const playerSelector = selector<Player | null>({
  key: 'playerSelector',
  get: ({ get }) => {
    return get(playerState);
  },
  set: ({ set }, newValue) => {
    set(playerState, newValue);
    set(selectedTeamState, null);
    set(searchTermState, null);
    set(selectionConfirmationState, false);
  },
});

export { resultSelector, playerSelector };
