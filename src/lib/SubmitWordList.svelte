<script>
  import { createEventDispatcher } from 'svelte';
  import wordsStore from '../stores/wordsStore';
  const dispatch = createEventDispatcher();
  let start = true;
  function resetWordStore() {
    $wordsStore = [];
  }
  function startGame() {
    start = false;
    dispatch('startGame');
  }
</script>

{#if $wordsStore.length}
  <ul class="list-group text-center mb-3">
    {#each $wordsStore as word, i (`${word}${i}`)}
      <li
        class="list-group-item list-group-item-info fs-1 d-flex justify-content-around"
      >
        <span class="w-50">{word}</span>
        <span class="w-50 badge bg-success">
          {word.length}
          {word.length === 1 ? `point` : `points`}
        </span>
      </li>
    {/each}
  </ul>
{/if}

{#if $wordsStore.length}
  <div class="text-end">
    <button
      type="button"
      class="btn btn-danger btn-lg"
      on:click={resetWordStore}
    >
      New Game
    </button>
  </div>

  {:else if start}
  <div class="h-100 d-flex justify-content-center align-items-center">
    <button type="button" class="btn btn-danger btn-lg" on:click={startGame}>
      Start Game
    </button>
  </div>

{/if}
