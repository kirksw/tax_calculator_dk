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
    }
}

export class TaxCalculator {
    monthly_salary: number;
    pension_pct: number;
    municipality_tax: MunicipalityTax;
    annual_taxrule: AnnualTaxRule;
    pay_churchtax: boolean;

    constructor(
        monthly_salary: number,
        supplement_pct: number,
        pension_pct: number,
        bonus_pct: number,
        municipality_tax: MunicipalityTax,
        annual_taxrule: AnnualTaxRule,
        pay_churchtax: boolean
    ) {
        this.monthly_salary = monthly_salary * (1 + supplement_pct / 100 + bonus_pct / 100);
        this.pension_pct = pension_pct;
        this.municipality_tax = municipality_tax;
        this.annual_taxrule = annual_taxrule;
        this.pay_churchtax = pay_churchtax;
    }

    calc_bfradrag() {
        // employment deduction (applied to bundskat and ???)
        return Math.min(
            this.annual_taxrule.bfradrag_pct / 100 * this.monthly_salary * 12,
            this.annual_taxrule.bfradrag_max
        )
    }

    calc_jobfradrag() {
        // job deduction (applied to bundskat and ???)
        return Math.min(
            this.annual_taxrule.jobfradrag_pct / 100 * this.monthly_salary * 12,
            this.annual_taxrule.jobfradrag_max
        )
    }

    calc_personfradrag() {
        // personal deduction (applies to bundskat and kommuneskat)
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
}