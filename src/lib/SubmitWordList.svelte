<script>
  import wordsStore from '../stores/wordsStore';
  function resetWordStore() {
    $wordsStore = [];
  }
</script>

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
{/if}
