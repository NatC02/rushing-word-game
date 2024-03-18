<script>
  import { onMount } from 'svelte';
  import GameBoard from './lib/GameBoard.svelte';
  import SubmitWordList from './lib/SubmitWordList.svelte';
  import { getWordsFromGSheet } from './api/getWordsFromGSheet';
  import { generateWordSearchPuzzle } from './helpers/generateWordSearchPuzzle';
  import Timer from './lib/Timer.svelte';

  let countdown = 15;
  let timerRef = null;
  onMount(async () => {
  });
</script>

<header class="mb-3">
  <h1 class="text-center">Boggle Game</h1>
</header>
<main class="container mb-3">
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-6" />
      </div>

      <GameBoard
        on:resetTimer={() => {
          timerRef.handleReset();
        }}
      />
    </div>
    <div class="col-md-6">
      <Timer
        bind:this={timerRef}
        on:new={() => {
          countdown = null;
        }}
        {countdown}
      />
    </div>
    <div class="col-md-6">
      <SubmitWordList />
    </div>
  </div>
</main>