export class MunicipalityTax {
    municipality_pct: number;
    church_pct: number;

    constructor(municipality_pct: number, church_pct: number) {
        this.municipality_pct = municipality_pct;
        this.church_pct = church_pct;
    }
}

export class AnnualTaxRule {
    // Arbejdsmarkedsbidrag -> Labor market contribution
    ambidrag_pct: number;
    // Beskæftigelsesfradrag -> Employment deduction
    bfradrag_max: number;
    bfradrag_pct: number;
    // Jobfradrag -> Job deduction
    jobfradrag_max: number;
    jobfradrag_pct: number;
    // Personfradrag -> Personal allowance
    personfradrag: number;
    // bundskat
    bundskat_pct: number;
    // topskat
    topskat_start: number;
    topskat_pct: number;
    // expattax
    expattax_pct: number;
    expattax_min: number;

    constructor(
        ambidrag_pct,
        bfradrag_max,
        bfradrag_pct,
        jobfradrag_max,
        jobfradrag_pct,
        personfradrag,
        bundskat_pct,
        topskat_start,
        topskat_pct,
        expattax_pct,
        expattax_min,
    ) {
        this.ambidrag_pct = ambidrag_pct;
        this.bfradrag_max = bfradrag_max;
        this.bfradrag_pct = bfradrag_pct;
        this.jobfradrag_max = jobfradrag_max;
        this.jobfradrag_pct = jobfradrag_pct;
        this.personfradrag = personfradrag;
        this.bundskat_pct = bundskat_pct;
        this.topskat_start = topskat_start;
        this.topskat_pct = topskat_pct;
        this.expattax_pct = expattax_pct;
        this.expattax_min = expattax_min;
    }
}

export class TaxCalculator {
    monthly_salary: number;
    pension_pct: number;
    municipality_tax: MunicipalityTax;
    annual_taxrule: AnnualTaxRule;
    pay_churchtax: boolean;
    pay_expattax: boolean;

    bfradrag: number;
    jobfradrag: number;
    personfradrag: number;

    ambidrag: number = 0;
    pensionbidrag: number = 0;
    bundskat: number = 0;
    kommuneskat: number = 0;
    topskat: number = 0;
    churchskat: number = 0;
    askat: number = 0;

    total_tax: number;
    tax_pct: number;
    marginal_taxrate: number;
    annual_salary: number;
    net_salary: number;

    constructor(
        monthly_salary: number,
        supplement_pct: number,
        pension_pct: number,
        bonus_pct: number,
        municipality_tax: MunicipalityTax,
        annual_taxrule: AnnualTaxRule,
        pay_churchtax: boolean,
        pay_expattax: boolean
    ) {
        this.monthly_salary = monthly_salary * (1 + supplement_pct / 100 + bonus_pct / 100);
        this.pension_pct = pension_pct;
        this.municipality_tax = municipality_tax;
        this.annual_taxrule = annual_taxrule;
        this.pay_churchtax = pay_churchtax;
        this.pay_expattax = pay_expattax;

        this.ambidrag = this.calc_ambidrag();
        if (!this.pay_expattax) {
            this.bfradrag = this.calc_bfradrag();
            this.jobfradrag = this.calc_jobfradrag();
            this.personfradrag = this.calc_jobfradrag();

            this.pensionbidrag = this.calc_pensionbidrag();
            this.bundskat = this.calc_bundskat();
            this.kommuneskat = this.calc_kommuneskat();
            this.topskat = this.calc_topskat();
            this.churchskat = this.calc_churchskat();
        } else {
            this.askat = this.calc_askat();
        }

        this.annual_salary = this.monthly_salary * 12;
        this.total_tax = this.ambidrag + this.bundskat + this.kommuneskat + this.topskat + this.churchskat + this.askat;
        this.tax_pct = this.total_tax / this.annual_salary;
        this.net_salary = this.annual_salary - this.total_tax - this.pensionbidrag;
    }

    calc_bfradrag() {
        // employment deduction
        return Math.min(
            this.annual_taxrule.bfradrag_pct / 100 * this.monthly_salary * 12,
            this.annual_taxrule.bfradrag_max
        )
    }

    calc_jobfradrag() {
        // job deduction
        return Math.min(
            this.annual_taxrule.jobfradrag_pct / 100 * this.monthly_salary * 12,
            this.annual_taxrule.jobfradrag_max
        )
    }

    calc_personfradrag() {
        // personal deduction
        return this.annual_taxrule.personfradrag
    }

    calc_ambidrag() {
        // labour market tax applied to all income
        return this.annual_taxrule.ambidrag_pct / 100 * this.monthly_salary * 12
    }

    calc_pensionbidrag() {
        return this.pension_pct / 100 * this.monthly_salary * 12;
    }

    calc_bundskat() {
        // base ta)x
        let deductions = this.calc_pensionbidrag() + this.calc_personfradrag() + this.calc_ambidrag()
        return Math.max(0, ((this.monthly_salary * 12) - deductions) * this.annual_taxrule.bundskat_pct / 100)
    }

    calc_kommuneskat() {
        // municipality tax
        let deductions = this.calc_pensionbidrag() + this.calc_bfradrag() + this.calc_jobfradrag() + this.calc_ambidrag() + this.calc_personfradrag()
        return Math.max(0, ((this.monthly_salary * 12) - deductions) * this.municipality_tax.municipality_pct / 100)
    }

    calc_topskat() {
        // topskat amount
        let deductions = this.annual_taxrule.topskat_start + this.calc_pensionbidrag() + this.calc_ambidrag()
        return Math.max(0, ((this.monthly_salary * 12) - deductions) * this.annual_taxrule.topskat_pct / 100)
    }

    calc_churchskat() {
        if (this.pay_churchtax) {
            // municipality tax
            let deductions = this.calc_pensionbidrag() + this.calc_bfradrag() + this.calc_jobfradrag() + this.calc_ambidrag();
            return Math.max(0, ((this.monthly_salary * 12) - deductions) * this.municipality_tax.church_pct / 100)
        } else {
            return 0
        }
    }

    calc_askat() {
        let deductions = this.calc_ambidrag();
        return Math.max(0, ((this.monthly_salary * 12) - deductions) * this.annual_taxrule.expattax_pct / 100)
    }
}