<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let quantity: number = 1;

    function decrementQuantity() {
        if (quantity > 1) {
            quantity -= 1;
            dispatch("comparisonChanged", quantity);
        }
    }

    function incrementQuantity() {
        if (quantity < 3) {
            quantity += 1;
            dispatch("comparisonChanged", quantity);
        }
    }
</script>

<div class="abs">
    <div>Number of calculator(s) <b>{quantity}</b></div>
    <div>
        <input
            type="button"
            value="-"
            on:click={decrementQuantity}
            disabled={quantity <= 1}
        />
        <input
            type="button"
            value="+"
            on:click={incrementQuantity}
            disabled={quantity >= 3}
        />
    </div>
</div>

<style>
    .abs {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 200px;
        height: 50px;
    }
</style>
