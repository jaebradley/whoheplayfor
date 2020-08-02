import { Store } from 'idb-keyval';

// https://github.com/jakearchibald/idb-keyval/issues/31
// need a database per store
const resultsStore = new Store('whoheplayforresults', 'results');

export default resultsStore;
