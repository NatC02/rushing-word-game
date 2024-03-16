<script>
  import { onMount } from 'svelte';
  import { generateWordSearchPuzzle } from '../helpers/generateWordSearchPuzzle';
  import wordsStore from '../stores/wordsStore';
  import ClickedLetters from './ClickedLetters.svelte';
  import GameBoardLetter from './GameBoardLetter.svelte';
  
  const boggleGame = generateWordSearchPuzzle();
  const boggleGameletters = boggleGame.data.grid
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((word, index) => ({
      letter: word,
      xCoordinate: (index % boggleGame.settings.cols) + 1,
      yCoordinate: Math.floor(index / boggleGame.settings.cols) + 1,
    }));
  console.log(boggleGame);
  
  let clickedLetterIndexArray = [];
  let toastMessage;
  let isSuccessToast;
  let initialGoingDirection;

  async function submitWord() {
    const word = clickedLettersArray.join('');

    if (!word) {
      return;
    }
    let data;
    try {
      data = await (
        await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      ).json();
    } catch (error) {
      console.error(error);
    }
    if (data.message) {
      alert(data.message);
      clickedLetterIndexArray = [];
      return;
    }
    console.log(data);
    $wordsStore = [...$wordsStore, word];
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

  $: isClicked = (letterIndex) =>
    clickedLetterIndexArray.find((item) => item === letterIndex) !== undefined;
  $: clickedLettersArray = clickedLetterIndexArray.map(
    (clickedLetterIndex) => boggleGameletters[clickedLetterIndex].letter
  );
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
