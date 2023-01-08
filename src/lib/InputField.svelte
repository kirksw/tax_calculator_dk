<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function submitForm(e) {
        const formData = new FormData(e.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        dispatch("formSubmit", data);
    }

    // defaults
    export let defaultSalary: string = "0";
    export let defaultKommune: string = "Copenhagen";
    export let defaultYear: string = "2023";

    //$: selected = options.find(o => o.id === "2");
    //$: selected = options.find(o => o.id === "2");
</script>

<form class="component-container" on:submit|preventDefault={submitForm}>
    <div class="component">
        <label for="salary">Monthy salary [kr]</label>
        <input
            type="number"
            id="salary"
            name="salary"
            value={parseFloat(defaultSalary)}
            step="500"
        />
    </div>

    <div class="component">
        <label for="supplement_pct">Supplement [%]</label>
        <input
            type="number"
            id="supplement_pct"
            name="supplement_pct"
            value="0"
            step="0.5"
        />
    </div>

    <div class="component">
        <label for="pension_pct">Pension [%]</label>
        <input
            type="number"
            id="pension_pct"
            name="pension_pct"
            value="0"
            step="0.5"
        />
    </div>

    <div class="component">
        <label for="bonus_pct">Bonus [%]</label>
        <input
            type="number"
            id="bonus_pct"
            name="bonus_pct"
            value="0"
            step="0.5"
        />
    </div>

    <div class="component">
        <label for="tax_year">Tax year</label>
        <select id="tax_year" name="tax_year">
            <option>2023</option>
            <option>2022</option>
        </select>
    </div>

    <div class="component">
        <label for="kommune">Municipality</label>
        <select id="kommune" name="kommune">
            <option>Middelfart</option>
            <option>Copenhagen</option>
            <option>Frederiksberg</option>
        </select>
    </div>

    <div class="component">
        <label for="churchtax">Pay churchtax</label>
        <input type="checkbox" id="churchtax" name="churchtax" />
    </div>

    <div class="component">
        <label for="expattax">Pay expattax</label>
        <input type="checkbox" id="expattax" name="expattax" />
    </div>

    <div class="component submit">
        <input type="submit" />
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
