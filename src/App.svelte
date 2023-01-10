<script lang="ts">
  import Calculator from "./lib/Calculator.svelte";
  import ComparisonController from "./lib/ComparisonController.svelte";

  let quantityCalc = 1;

  function changeNumCalcs(event) {
    let data = event.detail;

    quantityCalc = data;
  }
</script>

<main>
  <div class="header">
    <ComparisonController
      on:comparisonChanged={changeNumCalcs}
      quantity={quantityCalc}
    />
  </div>

  <div class="container">
    {#if quantityCalc >= 1}
      <Calculator />
    {/if}

    {#if quantityCalc >= 2}
      <Calculator />
    {/if}

    {#if quantityCalc >= 3}
      <Calculator />
    {/if}
  </div>
</main>

<style>
  h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 10px;
  }

  .container {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    gap: 0 20px;
  }

  .header {
    background-color: #eee;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
  }

  .header-text {
    margin: 0 auto;
    text-align: center;
  }
</style>
