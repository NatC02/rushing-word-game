<script>
  import { Toast } from 'bootstrap';
  import { onMount } from 'svelte';

  import toastItemsStore from '../stores/toastItemsStore';
  import toastRefStore from '../stores/toastRefStore';
  import wordsStore from '../stores/wordsStore';

  let toastMessage;
  let isSuccessToast;

  let toastLiveExample;

  $: {
    toastMessage = $toastItemsStore.toastMessage;
    isSuccessToast = $toastItemsStore.isSuccessToast;
  }

  onMount(() => {
    $toastRefStore = new Toast(toastLiveExample);
  });
</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div
    id="liveToast"
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    bind:this={toastLiveExample}
    data-bs-delay="1000"
  >
    <div class="toast-header">
      {#if isSuccessToast}
        <i class="bi bi-check-circle-fill text-success me-1" />
        <strong class="me-auto">Great Job 😍</strong>
        <small>Get {$wordsStore.at(-1)?.length} Points</small>
      {:else}
        <i class="bi bi-x-circle-fill text-danger me-1" />
        <strong class="me-auto">Try Again 😥</strong>
      {/if}

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      />
    </div>
    <div class="toast-body">{toastMessage}</div>
  </div>
</div>
