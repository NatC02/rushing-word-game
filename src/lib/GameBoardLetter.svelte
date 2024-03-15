<script>
  export let letter;

  export let active;
</script>

<button
  class="btn btn-outline-info p-0 ratio ratio-1x1 fs-1 d-flex justify-content-center align-items-center"
  class:active
  on:click
>
  {letter}
</button>
