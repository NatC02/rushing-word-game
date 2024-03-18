import { writable } from 'svelte/store';

const toastItemsStore = writable({
  toastMessage: 'Keep Going ~ 🚀',
  isSuccessToast: true,
});

export default toastItemsStore;
