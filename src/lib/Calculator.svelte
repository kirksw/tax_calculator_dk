<script lang="ts">
    import {
        TaxCalculator,
        MunicipalityTax,
        AnnualTaxRule,
    } from "./Calculator";
    import DisplayField from "./DisplayField.svelte";
    import InputField from "./InputField.svelte";

    let bfradrag: number = 0;
    let jobfradrag: number = 0;
    let personfradrag: number = 0;

    let bundskat: number = 0;
    let topskat: number = 0;
    let kommuneskat: number = 0;
    let churchskat: number = 0;

    let total_skat: number = 0;
    let annual_salary: number = 0;
    let net_salary: number = 0;

    let tax_pct: number = 0;
    let ambidrag: number = 0;
    let pensionbidrag: number = 0;

    function handleSubmit(event) {
        let data = event.detail;

        let mt: MunicipalityTax;
        let at: AnnualTaxRule;

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

        let tax_calc = new TaxCalculator(
            parseFloat(data["salary"]),
            parseFloat(data["supplement_pct"]),
            parseFloat(data["pension_pct"]),
            parseFloat(data["bonus_pct"]),
            mt,
            at,
            data["churchtax"] ? true : false
        );

        bfradrag = tax_calc.calc_bfradrag();
        jobfradrag = tax_calc.calc_jobfradrag();
        personfradrag = tax_calc.calc_personfradrag();

        ambidrag = tax_calc.calc_ambidrag();
        pensionbidrag = tax_calc.calc_pensionbidrag();
        bundskat = tax_calc.calc_bundskat();
        topskat = tax_calc.calc_topskat();
        kommuneskat = tax_calc.calc_kommuneskat();
        churchskat = tax_calc.calc_churchskat();

        total_skat = bundskat + topskat + kommuneskat + ambidrag + churchskat;
        let other_deductions: number = pensionbidrag;
        let total_deducation: number = total_skat + other_deductions;
        annual_salary = tax_calc.monthly_salary * 12;
        net_salary = annual_salary - total_deducation;

        tax_pct = total_skat / annual_salary;
    }
</script>

<div class="container">
    <InputField defaultSalary="60000" on:formSubmit={handleSubmit} />

    <DisplayField
        class="normal"
        desc="Annual salary"
        value={annual_salary.toFixed(0)}
        add="Per annum"
    />

    <DisplayField
        class="normal"
        desc="Employment deduction"
        value={(bfradrag / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Job deduction"
        value={(jobfradrag / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Personal deduction"
        value={(personfradrag / 12).toFixed(1)}
    />

    <DisplayField
        class="normal"
        desc="Labour market contribution"
        value={(ambidrag / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Bottom tax"
        value={(bundskat / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Top tax"
        value={(topskat / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Municipality tax"
        value={(kommuneskat / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Church tax"
        value={(churchskat / 12).toFixed(1)}
    />
    <DisplayField
        class="normal"
        desc="Tax rate"
        value={(tax_pct * 100).toFixed(1)}
        add=""
        unit="%"
    />
    <DisplayField
        class="normal"
        desc="Tax"
        value={(total_skat / 12).toFixed(0)}
    />
    <DisplayField
        class="normal"
        desc="Payout"
        value={(net_salary / 12).toFixed(0)}
    />
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
