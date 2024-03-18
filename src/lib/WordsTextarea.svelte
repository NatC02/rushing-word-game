<script>
  import { createEventDispatcher } from "svelte";

  import { BOGGLE_GAME_DEFAULT_OPTIONS } from "../utilities/constants";
  
  
  function removeSameWords(words) {
    return Array.from(new Set(words));
  }

  function splitByWhitespace(words) {
    return words.split(/\s+/);
  }

  export let words;

  const dispatch = createEventDispatcher();

  const boggleGameDefaultOptions = BOGGLE_GAME_DEFAULT_OPTIONS;

  let boggleGameWords = words;

  function generateNewBoggleGame() {
    dispatch("generateGame", formatWordsToWordArray(boggleGameWords));
  }

  function formatWordsToWordArray(words) {
    words = splitByWhitespace(words.trim());
    words = removeSameWords(words);
    return words.filter((word) => word.length <= boggleGameDefaultOptions.cols);
  }
</script>

<div class=" input-group mb-3">
  <button
    type="button"
    class="btn btn-outline-primary btn-lg"
    on:click={generateNewBoggleGame}
  >
    Generate
  </button>
  <textarea
    class="form-control"
    placeholder="enter some words"
    id="floatingTextarea"
    bind:value={boggleGameWords}
  />
</div>
