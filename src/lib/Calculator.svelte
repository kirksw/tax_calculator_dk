<script lang="ts">
    import {
        TaxCalculator,
        MunicipalityTax,
        AnnualTaxRule,
    } from "./Calculator";
    import DisplayField from "./DisplayField.svelte";
    import InputField from "./InputField.svelte";

    let tax_calc: TaxCalculator;
    let mt: MunicipalityTax;
    let at: AnnualTaxRule;

    function runTaxCalc(data) {
        return new TaxCalculator(
            parseFloat(data["salary"]),
            parseFloat(data["supplement_pct"]),
            parseFloat(data["pension_pct"]),
            parseFloat(data["bonus_pct"]),
            mt,
            at,
            data["churchtax"] ? true : false,
            data["expattax"] ? true : false
        );
    }

    function handleSubmit(event) {
        let data = event.detail;

        switch (data["kommune"]) {
            case "Middelfart":
                mt = new MunicipalityTax(25.8, 0.9);
                break;
            case "Frederiksberg":
                mt = new MunicipalityTax(22.8, 0.5);
                break;
            case "Copenhagen":
                mt = new MunicipalityTax(23.8, 0.8);
                break;
        }

        switch (data["tax_year"]) {
            case "2022":
                at = new AnnualTaxRule(
                    8,
                    43500,
                    10.65,
                    2700,
                    4.5,
                    46600,
                    12.09,
                    552500,
                    15
                );
                break;
            case "2023":
                at = new AnnualTaxRule(
                    8,
                    45600,
                    10.65,
                    2700,
                    4.5,
                    48000,
                    12.09,
                    568900,
                    14.18
                );
                break;
        }

        tax_calc = runTaxCalc(data);
    }
</script>

<div class="container">
    <InputField
        defaultSalary="60000"
        defaultYear="2023"
        defaultKommune="Copenhagen"
        on:formSubmit={handleSubmit}
    />

    {#if tax_calc}
        <DisplayField
            class="normal"
            desc="Annual salary"
            value={tax_calc.annual_salary.toFixed(0)}
            add="Per annum"
        />

        <DisplayField
            class="normal"
            desc="Employment deduction"
            value={(tax_calc.bfradrag / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Job deduction"
            value={(tax_calc.jobfradrag / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Personal deduction"
            value={(tax_calc.personfradrag / 12).toFixed(1)}
        />

        <DisplayField
            class="normal"
            desc="Labour market contribution"
            value={(tax_calc.ambidrag / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Bottom tax"
            value={(tax_calc.bundskat / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Top tax"
            value={(tax_calc.topskat / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Municipality tax"
            value={(tax_calc.kommuneskat / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Church tax"
            value={(tax_calc.churchskat / 12).toFixed(1)}
        />
        <DisplayField
            class="normal"
            desc="Tax rate"
            value={(tax_calc.tax_pct * 100).toFixed(1)}
            add=""
            unit="%"
        />
        <DisplayField
            class="normal"
            desc="Tax"
            value={(tax_calc.total_tax / 12).toFixed(0)}
        />
        <DisplayField
            class="normal"
            desc="Payout"
            value={(tax_calc.net_salary / 12).toFixed(0)}
        />
    {/if}
</div>

<style>
    .container {
        padding: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px 10px;
        background-color: rgba(120, 120, 120, 0.85);
    }
</style>
