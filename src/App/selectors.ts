import { selector } from 'recoil/dist';

import { playerState, selectedTeamState } from '@App/atoms';
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

export { resultSelector };
