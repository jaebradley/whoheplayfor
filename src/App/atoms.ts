import { atom } from 'recoil/dist';

const playerState = atom({
  key: 'playerState',
  default: null,
});

const selectedTeamState = atom({
  key: 'selectedTeamState',
  default: null,
});

const selectionConfirmationState = atom({
  key: 'selectionConfirmationState',
  default: false,
});

const searchTermState = atom({
  key: 'searchTermState',
  default: null,
});

export { playerState, selectedTeamState, selectionConfirmationState, searchTermState };
