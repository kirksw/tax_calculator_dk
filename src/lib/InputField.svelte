<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onDataChange(e) {
        dispatch("dataChange", {});
    }

    // defaults
    export let salary: number; //= 60000;
    export let kommune: string; //= "Copenhagen";
    export let tax_year: string; //= "2023";
    export let supplement_pct: number; //= 0;
    export let pension_pct: number; //= 0;
    export let bonus_pct: number; //= 0;
    export let churchtax: boolean; //= false;
    export let expattax: boolean; //= false;
    export let expatminimum: number; //= 0;
</script>

<form class="component-container">
    <div class="component">
        <label for="salary">Monthy salary [kr]</label>
        <input
            type="number"
            id="salary"
            name="salary"
            bind:value={salary}
            step="500"
            on:change={onDataChange}
        />
    </div>

    <div class="component">
        <label for="supplement_pct">Supplement [%]</label>
        <input
            type="number"
            id="supplement_pct"
            name="supplement_pct"
            bind:value={supplement_pct}
            step="0.5"
            on:change={onDataChange}
        />
    </div>

    <div class="component">
        <label for="pension_pct">Pension [%]</label>
        <input
            type="number"
            id="pension_pct"
            name="pension_pct"
            bind:value={pension_pct}
            step="0.5"
            on:change={onDataChange}
        />
    </div>

    <div class="component">
        <label for="bonus_pct">Bonus [%]</label>
        <input
            type="number"
            id="bonus_pct"
            name="bonus_pct"
            bind:value={bonus_pct}
            step="0.5"
            on:change={onDataChange}
        />
    </div>

    <div class="component">
        <label for="tax_year">Tax year</label>
        <select
            id="tax_year"
            name="tax_year"
            bind:value={tax_year}
            on:change={onDataChange}
        >
            <option>2023</option>
            <option>2022</option>
        </select>
    </div>

    <div class="component">
        <label for="kommune">Municipality</label>
        <select
            id="kommune"
            name="kommune"
            bind:value={kommune}
            on:change={onDataChange}
        >
            <option>Middelfart</option>s
            <option>Copenhagen</option>
            <option>Frederiksberg</option>
        </select>
    </div>

    <div class="component">
        <label for="churchtax">Pay churchtax</label>
        <input
            type="checkbox"
            id="churchtax"
            name="churchtax"
            bind:checked={churchtax}
            on:change={onDataChange}
        />
    </div>

    <div class="component">
        <label for="expattax">Pay expattax</label>
        <input
            type="checkbox"
            id="expattax"
            name="expattax"
            bind:checked={expattax}
            on:change={onDataChange}
            disabled={salary < expatminimum}
        />
    </div>
</form>

<style>
    label {
        font-size: 0.8rem;
    }

    .component-container {
        background: #eee;
        padding: 10px;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        justify-items: center;
        gap: 10px 30px;
    }

    .component {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100px;
    }

    .submit input {
        height: 100%;
    }
</style>
