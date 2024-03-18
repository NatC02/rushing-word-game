import { writable } from 'svelte/store';

const gameLivesStore = writable(3);

export default gameLivesStore;
