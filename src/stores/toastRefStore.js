import { writable } from 'svelte/store';

const toastRefStore = writable(null);

export default toastRefStore;
