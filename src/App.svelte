<script>
  import { onMount } from 'svelte';

  import { COUNT_DOWN, WORDS_LIST } from './utilities/constants';

  import GameBoard from './lib/GameBoard.svelte';
  import NewGameButton from './lib/NewGameButton.svelte';
  import StartGameButton from './lib/StartGameButton.svelte';
  import SubmitWordList from './lib/SubmitWordList.svelte';
  import Timer from './lib/Timer.svelte';
  import ToastItem from './lib/ToastItem.svelte';

  import boggleGameWords from './stores/boggleGameWords';
  import gameLivesStore from './stores/gameLives';
  import wordsStore from './stores/wordsStore';

  import {
    findWordAudioUrl,
    playJingle1,
    playWord,
  } from './helpers/audioPlayer';
  import { delay } from './helpers/time';

  let timerRef;
  let gameBoardRef;

  const countdown = COUNT_DOWN;

  let startGame = false;
  let voices = [];
  let selectedVoice;

  function playBrowserSpeaker() {
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance($boggleGameWords[0]);
    utterance.rate = 0.7;
    utterance.pitch = 1;
    utterance.voice = selectedVoice;
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
  }

  function playLocalAudio() {
    const wordUrl = findWordAudioUrl(WORDS_LIST, $boggleGameWords[0]);
    playWord(wordUrl);
  }

  async function handleStartGame() {
    startGame = true;
    playJingle1();
    await delay(1000);
    playLocalAudio();
  }

  function handleNewGame() {
    $wordsStore = [];
    $gameLivesStore = 3;
    gameBoardRef.clearClickedLetterIndexArray();
    gameBoardRef.generateBoggleGame();
    startGame = false;
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

{#if !startGame}
  <header class="mb-3">
    <h1 class="text-center">Boggle Game</h1>
  </header>
{/if}

<main class="container mb-3">
  <div class="row">
    <div class="col-md-6">
      <GameBoard
        {startGame}
        bind:this={gameBoardRef}
        on:readNewWord={playLocalAudio}
        on:resetTimer={() => {
          timerRef.handleReset();
        }}
        on:resetGame={handleNewGame}
      />
    </div>

    <div class="col-md-6 ">
      {#if startGame}
        <div class="d-flex justify-content-between align-items-center ">
          <div>
            <div class="d-flex justify-content-center gap-2 mb-3">
              {#each Array($gameLivesStore) as life}
                <i class="bi bi-heart-fill fs-1 text-danger" />
              {:else}
                <span class="h1">GAME OVER</span>
              {/each}
            </div>

            <button
              type="button"
              class="btn btn-info btn-lg"
              on:click={playLocalAudio}
              disabled={!startGame}
            >
              Play Again
            </button>
          </div>

          <Timer
            bind:this={timerRef}
            {countdown}
            on:readNewWord={playLocalAudio}
          />
        </div>
      {/if}

      {#if $wordsStore.length}
        <SubmitWordList on:click={handleNewGame} />
      {/if}

      {#if !startGame}
        <StartGameButton on:click={handleStartGame} />
      {:else}
        <div class="d-flex justify-content-center mt-5">
          <NewGameButton on:click={handleNewGame} />
        </div>
      {/if}
    </div>
  </div>
</main>

<ToastItem />