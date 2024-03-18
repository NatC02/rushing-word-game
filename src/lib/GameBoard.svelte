<script>
  import { createEventDispatcher } from 'svelte';
  import { generateWordSearchPuzzle } from '../helpers/generateWordSearchPuzzle';
  import boggleGameWords from '../stores/boggleGameWords';
  import toastStore from '../stores/toastStore';
  import gameLivesStore from '../stores/gameLives';
  import toastItemsStore from '../stores/toastItemsStore';
  import toastStore from '../stores/toastRefStore';
  import wordsStore from '../stores/wordsStore';
  import ClickedLetters from './ClickedLetters.svelte';
  import GameBoardLetter from './GameBoardLetter.svelte';
  import ToastItem from './ToastItem.svelte';
  const dispatch = createEventDispatcher();
  let boggleGame;
  let clickedLetterIndexArray = [];
  let toastMessage;
  let isSuccessToast;
  let initialGoingDirection;
  generateBoggleGame();
  export function generateBoggleGame() {
    boggleGame = generateWordSearchPuzzle();
    $boggleGameWords = boggleGame.data.words.map((word) => word.clean);
    console.log(boggleGame);
  }

  async function submitWord() {

    if ($gameLivesStore === 0) {
      $toastItemsStore.toastMessage = `GAME OVER - 😥`;
      $toastItemsStore.isSuccessToast = false;
      $toastStore.show();
      return;
    }

    const word = clickedLettersArray.join('');

    if (word !== $boggleGameWords[0]) {
      $toastItemsStore.toastMessage = 'Wrong word!';
      $toastItemsStore.isSuccessToast = false;
      $toastStore.show();
      return;
    }

    $toastItemsStore.isSuccessToast = true;
    $toastItemsStore.toastMessage = 'Keep Going ~ 🚀';
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
        boggleGameletters[clickedLetterIndexArray.at(-1)],
        boggleGameletters[i]
      );
    }
    clickedLetterIndexArray = [...clickedLetterIndexArray, i];
  }
  function canClick(i) {
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
      isConnectedSquares(boggleGameletters[letterIndex], boggleGameletters[i])
    );
  }
  function isUsingPreviousLetter(i) {
    return clickedLetterIndexArray === i;
  }
  function isSecondClickAllowed(i) {
    const secondtLetter = boggleGameletters[i];
    const firstLetter = boggleGameletters[clickedLetterIndexArray.at(0)];
    const currentDirection = goingDirection(firstLetter, secondtLetter);
    return (
      boggleGame.settings.allowedDirections.includes(currentDirection) &&
      isConnectedSquares(firstLetter, secondtLetter)
    );
  }
  function isCurrentDirectionSameAsInitialGoingDirection(i) {
    return (
      goingDirection(
        boggleGameletters[clickedLetterIndexArray.at(-1)],
        boggleGameletters[i]
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
    (clickedLetterIndex) => boggleGameletters[clickedLetterIndex].letter
  );
  $: boggleGameletters = boggleGame.data.grid
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((word, index) => ({
      letter: word,
      xCoordinate: (index % boggleGame.settings.cols) + 1,
      yCoordinate: Math.floor(index / boggleGame.settings.cols) + 1,
    }));
</script>
<div class="d-flex flex-column align-items-center mb-3">
  <div class="gameboard mb-3">
    {#each boggleGameletters as letterObject, i (`${letterObject}${i}`)}
      <GameBoardLetter
        letter={letterObject.letter}
        active={isClicked(i)}
        on:click={() => addLetter(i)}
      />
    {/each}
  </div>
  <div class="d-flex justify-content-center align-items-center gap-2 gap-sm-3">
    <ClickedLetters {clickedLettersArray} />
    <button type="button" class="btn btn-primary btn-lg" on:click={submitWord}>
      Submit
    </button>
  </div>
</div>

<style>
  .gameboard {
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 100px));
    /* border: 0.5px black solid; */
  }
</style>