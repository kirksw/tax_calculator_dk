<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onDataChange(e) {
        dispatch("dataChange", {});
    }

    // defaults
    export let salary: number; //= 60000;
    export let kommune: string; //= "Mid";
    export let tax_year: string; //= "2023";
    export let pension_pct: number; //= 0;
    export let bonus_pct: number; //= 0;
    export let churchtax: boolean; //= false;
    export let expattax: boolean; //= false;
    export let expatminimum: number; //= 0;
</script>

<form class="row gy-2 gx-3 align-items-center">
    <div class="form-floating col-sm-4">
        <input
            class="form-control"
            type="number"
            id="salary"
            name="salary"
            step="500"
            min="10000"
            bind:value={salary}
            on:change={onDataChange}
        />
        <label for="salary">Monthy salary [kr]</label>
    </div>

    <div class="form-floating col-sm-4">
        <select
            class="form-control"
            id="tax_year"
            name="tax_year"
            bind:value={tax_year}
            on:change={onDataChange}
        >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
        </select>
        <label for="tax_year">Tax year</label>
    </div>

    <div class="form-floating col-sm-4">
        <select
            class="form-control"
            id="kommune"
            name="kommune"
            bind:value={kommune}
            on:change={onDataChange}
        >
            <option value="Expensive">[~25.5%] Aalborg, etc</option>
            <option value="Mid">[~24.5%] Aarhus, Frederiksberg, etc</option>
            <option value="Cheap">[~23.5%] Copenhagen, etc</option>
        </select>
        <label for="kommune">Municipality</label>
    </div>

    <div class="form-floating col-sm-4">
        <input
            class="form-control"
            type="number"
            id="pension_pct"
            name="pension_pct"
            step="0.5"
            min="0"
            bind:value={pension_pct}
            on:change={onDataChange}
        />
        <label for="pension_pct">Pension (Company) [%]</label>
    </div>

    <div class="component col-auto">
        <input
            class="form-check-input"
            type="checkbox"
            id="churchtax"
            name="churchtax"
            bind:checked={churchtax}
            on:change={onDataChange}
        />
        <label for="churchtax" class="form-check-label">Pay churchtax</label>
    </div>

    <div class="component col-auto">
        <input
            class="form-check-input"
            type="checkbox"
            id="expattax"
            name="expattax"
            bind:checked={expattax}
            on:change={onDataChange}
            disabled={salary < expatminimum}
        />
        <label for="expattax" class="form-check-label">Pay expattax</label>
    </div>
</form>

<style>
    label {
        font-size: 0.8rem;
    }
</style>
