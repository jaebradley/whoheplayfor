import { Store } from 'idb-keyval';

const seenPlayersStore = new Store('whoheplayfor', 'seen-players');

export default seenPlayersStore;
