<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let quantity: number = 1;

    function setNumberCards(num: number) {
        dispatch("comparisonChanged", num);
    }
</script>

<div class="abs left">
    <div>
      Number of calculators
  </div>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button
            type="button"
            class="btn btn-primary"
            on:click={() => setNumberCards(1)}
            disabled={quantity == 1}>1</button
        >
        <button
            type="button"
            class="btn btn-primary"
            on:click={() => setNumberCards(2)}
            disabled={quantity == 2}>2</button
        >
        <button
            type="button"
            class="btn btn-primary"
            on:click={() => setNumberCards(3)}
            disabled={quantity == 3}>3</button
        >
    </div>
</div>

<style lang="scss">
    .abs {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100px;
    }

    .left {
        margin: 5px;
        align-items: left;
    }
</style>
