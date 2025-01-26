<script lang="ts">
    import {
        TaxCalculator,
        MunicipalityTax,
        AnnualTaxRule,
    } from "./Calculator";
    import DisplayField from "./DisplayField.svelte";
    import InputField from "./InputField.svelte";
    import { onMount } from "svelte";

    let tax_calc: TaxCalculator;
    let mt: MunicipalityTax;
    let at: AnnualTaxRule;

    let salary = 70000;
    let tax_year = "2025";
    let kommune = "Cheap";
    let pension_pct = 0.0;
    let bonus_pct = 0.0; // TODO: use
    let churchtax = false;
    let expattax = false;
    let expatminimum = 0;

    onMount(() => {
        runTaxCalc();
    });

    function runTaxCalc() {
        switch (kommune) {
            case "Expensive":
                mt = new MunicipalityTax(25.5, 1.0);
                break;
            case "Mid":
                mt = new MunicipalityTax(24.5, 0.5);
                break;
            case "Cheap":
                mt = new MunicipalityTax(23.5, 0.8);
                break;
        }

        switch (tax_year) {
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
                    15,
                    27,
                    70400,
                    12.00,
                    9072
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
                    14.18,
                    27,
                    72500,
                    12.00,
                    9348
                );
                break;
            case "2024":
                at = new AnnualTaxRule(
                    8,
                    45100,
                    10.65,
                    2800,
                    4.5,
                    49700,
                    12.01,
                    588900,
                    14.26,
                    27,
                    75100,
                    12.00,
                    9672
                );
                break;
            case "2025":
                at = new AnnualTaxRule(
                    8,
                    49700,
                    10.65,
                    2900,
                    4.5,
                    51600,
                    12.01,
                    611800,
                    15.00,
                    27,
                    78000,
                    12.00,
                    10056
                );
                break;
        }

        // untick
        if (salary < at.expattax_min) {
            expattax = false;
        }

        tax_calc = new TaxCalculator(
            salary,
            mt,
            at,
            pension_pct,
            churchtax ? true : false,
            expattax ? true : false
        );

        expatminimum = at.expattax_min;
    }
</script>

<div class="container">
    <InputField
        bind:salary
        bind:tax_year
        bind:pension_pct
        bind:kommune
        bind:churchtax
        bind:expattax
        bind:expatminimum
        on:dataChange={runTaxCalc}
    />

    {#if tax_calc}
        <DisplayField
            desc="Annual salary"
            value={tax_calc.annual_salary.toFixed(0)}
            add="Per annum"
        />

        {#if !tax_calc.pay_expattax}
            <DisplayField
                desc="Employment deduction"
                value={(tax_calc.bfradrag / 12).toFixed(1)}
            />
            <DisplayField
                desc="Job deduction"
                value={(tax_calc.jobfradrag / 12).toFixed(1)}
            />
            <DisplayField
                desc="Personal deduction"
                value={(tax_calc.personfradrag / 12).toFixed(1)}
            />
        {/if}

        <DisplayField
            desc="Labour market contribution"
            value={(tax_calc.ambidrag / 12).toFixed(1)}
        />

        {#if !tax_calc.pay_expattax}
            <DisplayField
                desc="Bottom tax"
                value={(tax_calc.bundskat / 12).toFixed(1)}
            />
            <DisplayField
                desc="Top tax"
                value={(tax_calc.topskat / 12).toFixed(1)}
            />
            <DisplayField
                desc="Municipality tax"
                value={(tax_calc.kommuneskat / 12).toFixed(1)}
            />
            <DisplayField
                desc="Church tax"
                value={(tax_calc.churchskat / 12).toFixed(1)}
            />
        {/if}

        {#if tax_calc.pay_expattax}
            <DisplayField
                desc="A tax"
                value={(tax_calc.askat / 12).toFixed(1)}
            />
        {/if}

        <DisplayField
            desc="Tax rate"
            value={(tax_calc.tax_pct * 100).toFixed(1)}
            add=""
            unit="%"
        />
        <DisplayField desc="Tax" value={(tax_calc.total_tax / 12).toFixed(0)} />
        <DisplayField
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
