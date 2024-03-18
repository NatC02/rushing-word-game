<script>
  import { createEventDispatcher } from 'svelte';

  import { BOGGLE_GAME_DEFAULT_OPTIONS } from '../utilities/constants';

  import boggleGameWords from '../stores/boggleGameWords';
  import gameLivesStore from '../stores/gameLives';
  import toastItemsStore from '../stores/toastItemsStore';
  import toastStore from '../stores/toastRefStore';
  import wordsStore from '../stores/wordsStore';

  import ClickedLetters from './ClickedLetters.svelte';
  import GameBoardLetter from './GameBoardLetter.svelte';
  import WordsTextarea from './WordsTextarea.svelte';

  import { playJingle2, playJingle3 } from '../helpers/audioPlayer';
  import { generateWordSearchPuzzle } from '../helpers/generateWordSearchPuzzle';
  import { delay } from '../helpers/time';

  export let startGame;

  const dispatch = createEventDispatcher();

  const boggleGameDefaultOptions = BOGGLE_GAME_DEFAULT_OPTIONS;
  let boggleGame;
  let clickedLetterIndexArray = [];
  let initialGoingDirection;

  generateBoggleGame();

  export function generateBoggleGame(...arg) {
    if (arg[0]?.detail) {
      boggleGameDefaultOptions.dictionary = arg[0].detail;
    }

    boggleGame = generateWordSearchPuzzle(boggleGameDefaultOptions);
    $boggleGameWords = boggleGame.data.words.map((word) => word.clean);

    console.log(boggleGame);
  }

  async function submitWord() {
    if ($gameLivesStore === 0) {
      $toastItemsStore.toastMessage = `GAME OVER - 😥`;
      $toastItemsStore.isSuccessToast = false;

      playJingle2();
      await delay(1000);

      $toastStore.show();
      return;
    }

    const word = clickedLettersArray.join('');

    if (!word) {
      $toastItemsStore.toastMessage = `It's Empty!`;
      $toastItemsStore.isSuccessToast = false;

      playJingle2();
      await delay(1000);

      $toastStore.show();
      return;
    }

    if (word !== $boggleGameWords[0]) {
      $toastItemsStore.toastMessage = 'Wrong word!';
      $toastItemsStore.isSuccessToast = false;

      playJingle2();
      await delay(1000);

      $toastStore.show();
      clickedLetterIndexArray = [];
      return;
    }

    $toastItemsStore.isSuccessToast = true;
    $toastItemsStore.toastMessage = 'Keep Going ~ 🚀';

    playJingle3();
    await delay(1000);

    $toastStore.show();
    dispatch('resetTimer');
    $boggleGameWords = $boggleGameWords.filter(
      (gameWord) => gameWord !== word.toUpperCase()
    );

    $wordsStore = [...$wordsStore, word];

    if ($wordsStore.length === boggleGame.data.words.length) {
      $toastItemsStore.toastMessage = `Well Done ! 🌞`;
      $toastItemsStore.isSuccessToast = true;
      $toastStore.show();
      clickedLetterIndexArray = [];
      dispatch('resetGame');
      return;
    }

    dispatch('readNewWord');

    clickedLetterIndexArray = [];
  }

  function addLetter(i) {
    if (clickedLetterIndexArray.length >= 4) {
      return;
    }

    if (!canClick(i)) {
      return;
    }

    if (clickedLetterIndexArray.length === 1) {
      initialGoingDirection = goingDirection(
        boggleGameLetters[clickedLetterIndexArray.at(-1)],
        boggleGameLetters[i]
      );
    }

    clickedLetterIndexArray = [...clickedLetterIndexArray, i];
  }

  function clearLetter() {
    clickedLetterIndexArray = [];
  }

  function canClick(i) {
    if (!startGame) {
      return;
    }

    //  first click always can click
    if (clickedLetterIndexArray.length === 0) {
      return true;
    }

    // determine whether second click can click
    if (clickedLetterIndexArray.length === 1) {
      return isSecondClickAllowed(i);
    }

    if (isUsingPreviousLetter(i)) {
      return false;
    }

    if (!isCurrentDirectionSameAsInitialGoingDirection(i)) {
      return false;
    }

    return clickedLetterIndexArray.some((letterIndex) =>
      isConnectedSquares(boggleGameLetters[letterIndex], boggleGameLetters[i])
    );
  }

  function isUsingPreviousLetter(i) {
    return clickedLetterIndexArray === i;
  }

  function isSecondClickAllowed(i) {
    const secondLetter = boggleGameLetters[i];
    const firstLetter = boggleGameLetters[clickedLetterIndexArray.at(0)];

    const currentDirection = goingDirection(firstLetter, secondLetter);

    return (
      boggleGame.settings.allowedDirections.includes(currentDirection) &&
      isConnectedSquares(firstLetter, secondLetter)
    );
  }

  function isCurrentDirectionSameAsInitialGoingDirection(i) {
    return (
      goingDirection(
        boggleGameLetters[clickedLetterIndexArray.at(-1)],
        boggleGameLetters[i]
      ) === initialGoingDirection
    );
  }

  function isConnectedSquares(square1, square2) {
    const distance = Math.hypot(
      square1.xCoordinate - square2.xCoordinate,
      square1.yCoordinate - square2.yCoordinate
    );

    return distance === 1 || distance === Math.sqrt(2);
  }

  function goingDirection(previousLetter, currentLetter) {
    const xVector = currentLetter.xCoordinate - previousLetter.xCoordinate;
    const yVector = currentLetter.yCoordinate - previousLetter.yCoordinate;
    return `${yVector > 0 ? 'S' : yVector < 0 ? 'N' : ''}${
      xVector > 0 ? 'E' : xVector < 0 ? 'W' : ''
    }`;
  }

  export function clearClickedLetterIndexArray() {
    clickedLetterIndexArray = [];
  }

  $: isClicked = (letterIndex) =>
    clickedLetterIndexArray.find((item) => item === letterIndex) !== undefined;

  $: clickedLettersArray = clickedLetterIndexArray.map(
    (clickedLetterIndex) => boggleGameLetters[clickedLetterIndex].letter
  );

  $: boggleGameLetters = boggleGame.data.grid
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((word, index) => ({
      letter: word,
      xCoordinate: (index % boggleGame.settings.cols) + 1,
      yCoordinate: Math.floor(index / boggleGame.settings.cols) + 1,
    }));
</script>

<div class="d-flex flex-column align-items-center mb-3">
  <div class="gameboard mb-3">
    {#each boggleGameLetters as letterObject, i (`${letterObject}${i}`)}
      <GameBoardLetter
        letter={letterObject.letter}
        active={isClicked(i)}
        on:click={() => addLetter(i)}
      />
    {/each}
  </div>

  <ClickedLetters {clickedLettersArray} />

  <div class="d-flex justify-content-center align-items-center gap-2 gap-sm-3">
    <button
      type="button"
      class="btn btn-primary btn-lg"
      on:click={submitWord}
      disabled={!startGame}
    >
      Submit
    </button>
    <button
      type="button"
      class="btn  btn-warning btn-lg"
      on:click={clearLetter}
      disabled={!startGame}
    >
      Clear
    </button>
  </div>
</div>

{#if !startGame}
  <WordsTextarea
    words={$boggleGameWords.join(' ')}
    on:generateGame={generateBoggleGame}
  />
{/if}

<style>
  .gameboard {
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 100px));
  }
</style>