<script>
  export let clickedLettersArray;
</script>

<div class="d-flex gap-2 gap-sm-3 mb-3">
  {#each Array.from(Array(4)) as word, i (`${word}${i}`)}
    <span class="box rounded border border-info fs-1 text-center">
      {clickedLettersArray[i] ?? ''}</span
    >
  {/each}
</div>

<style>
  .box {
    width: 50px;
    height: 50px;
    line-height: 50px;
  }
</style>
