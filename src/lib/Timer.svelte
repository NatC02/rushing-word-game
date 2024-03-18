branch: speech

src/App.svelte

<script>
 import { onMount } from 'svelte';
 import GameBoard from './lib/GameBoard.svelte';
 import SubmitWordList from './lib/SubmitWordList.svelte';
 import Timer from './lib/Timer.svelte';
 import boggleGameWords from './stores/boggleGameWords';
 let countdown = 15;
 let timerRef = null;
 let startGame = false;
 let voices = [];
 let selectedVoice;
 function play() {
  speechSynthesis.cancel();
  let utterance = new SpeechSynthesisUtterance($boggleGameWords[0]);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.voice = selectedVoice;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
 }
 function startGameFn() {
  startGame = true;
  play();
 }
 onMount(async () => {
  // content here
  // console.log(await getWordsFromGSheet());
  // console.log(generateWordSearchPuzzle());
 });
 onMount(() => {
  speechSynthesis.onvoiceschanged = () => {
   voices = speechSynthesis.getVoices();
   selectedVoice = voices[4];
  };
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
    on:readNewWord={play}
    on:resetTimer={() => {
     timerRef.handleReset();
    }}
   />
  </div>
  <div class="col-md-6">
   <SubmitWordList />
   {#if startGame}
    <Timer
     bind:this={timerRef}
     on:new={() => {
      countdown = null;
     }}
     {countdown}
    />
   {/if}

   <SubmitWordList on:startGame={startGameFn} />
  </div>
 </div>
</main>
