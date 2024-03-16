<script>
  import { boggleGameLetters } from '../helpers/boggleGameLetters';
  import wordsStore from '../stores/wordsStore';
  import ClickedLetters from './ClickedLetters.svelte';
  import GameBoardLetter from './GameBoardLetter.svelte';
  let boggleGameletters = boggleGameLetters();
  let clickedLetterIndexArray = [];
  async function submitWord() {
    const word = clickedLettersArray.join('');
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
  function resetWordStore() {
    $wordsStore = [];
  }
  function addLetter(i) {
    if (clickedLetterIndexArray.length >= 4) {
      return;
    }
    clickedLetterIndexArray = [...clickedLetterIndexArray, i];
  }
  $: isClicked = (letterIndex) =>
    clickedLetterIndexArray.find((item) => item === letterIndex) !== undefined;
  $: clickedLettersArray = clickedLetterIndexArray.map(
    (clickedLetterIndex) => boggleGameletters[clickedLetterIndex]
  );
</script>

<div class="d-flex flex-column align-items-center mb-3">
  <div class="gameboard mb-3">
    {#each boggleGameletters as letter, i (`${letter}${i}`)}
      <GameBoardLetter
        {letter}
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
