<script>
  import { onMount } from 'svelte';
  import GameBoard from './lib/GameBoard.svelte';
  import SubmitWordList from './lib/SubmitWordList.svelte';
  import { getWordsFromGSheet } from './api/getWordsFromGSheet';
  import { generateWordSearchPuzzle } from './helpers/generateWordSearchPuzzle';
  onMount(async () => {
  });
</script>

<header class="mb-3">
  <h1 class="text-center">Boggle Game</h1>
</header>
<main class="container mb-3">
  <div class="row">
    <div class="col-md-6">
      <GameBoard />
    </div>
    <div class="col-md-6">
      <SubmitWordList />
    </div>
  </div>
</main>