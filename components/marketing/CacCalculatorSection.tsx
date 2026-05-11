"use client";

import { useMemo, useState } from "react";
import { trackVectorCalculatorSubmit } from "@/lib/analytics/vectorCalculator";

type CalculatorState = {
  adSpend: number;
  custAcq: number;
  aov: number;
  visitors: number;
};

const initialState: CalculatorState = {
  adSpend: 5000,
  custAcq: 80,
  aov: 95,
  visitors: 4000,
};

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

export function CacCalculatorSection() {
  const [values, setValues] = useState<CalculatorState>(initialState);

  const results = useMemo(() => {
    const spend = Number(values.adSpend) || 0;
    const customers = Number(values.custAcq) || 1;
    const visitors = Number(values.visitors) || 0;

    const cac = spend / customers;
    const cgoCac = cac * 0.37;
    const cgoCustomers = Math.round(visitors * 0.015);
    const savings = Math.max(0, Math.round((cac - cgoCac) * cgoCustomers));

    return {
      cac,
      cgoCac,
      savings,
    };
  }, [values]);

  function updateValue(field: keyof CalculatorState, rawValue: string) {
    setValues((current) => ({
      ...current,
      [field]: Number(rawValue),
    }));
  }

  function handleCalculate() {
    const paidCvrPct =
      values.visitors > 0 ? (values.custAcq / values.visitors) * 100 : 0;
    const annualUnlocked = results.savings * 12;
    const annualAdSpend = values.adSpend * 12;
    const roiPct =
      annualAdSpend > 0 ? Math.round((annualUnlocked / annualAdSpend) * 100) : 0;

    trackVectorCalculatorSubmit({
      icp_persona: "fashion_apparel",
      inputs: {
        monthly_ad_spend: values.adSpend,
        cost_per_click: 0,
        average_order_value: values.aov,
        gross_margin_pct: 0,
        paid_cvr_pct: Number(paidCvrPct.toFixed(2)),
        organic_visitors: values.visitors,
      },
      outputs: {
        cac: Math.round(results.cac),
        annual_revenue_unlocked: annualUnlocked,
        organic_lift_revenue_monthly: results.savings,
        vector_roi_vs_ad_spend_pct: roiPct,
        orders_to_breakeven: 0,
      },
      segmentation: {
        revenue_band: "50k_150k_annual",
        cac_severity: results.cac >= values.aov * 2 ? "high" : "moderate",
        high_cac_flag: results.cac >= values.aov * 2,
        offer_opportunity_score: Math.round(results.savings / 24),
      },
    });
  }

  return (
    <section className="bg-surface-subtle py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-surface-border bg-white p-8 shadow-xl md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            ROI calculator
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl">
            What is your current CAC really costing you?
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-muted">
            Enter your numbers. We&apos;ll show you what Customer Generated
            Offers saves you, conservatively.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
                <span className="text-sm font-semibold text-black">
                  Monthly ad spend (Meta/Google)
                </span>
                <div className="mt-3 flex items-center rounded-askrami border border-surface-border bg-white px-4">
                  <span className="text-sm font-semibold text-neutral-muted">$</span>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={values.adSpend}
                    onChange={(event) => updateValue("adSpend", event.target.value)}
                    className="w-full bg-transparent px-2 py-3 text-base font-semibold text-black outline-none"
                  />
                </div>
              </label>

              <label className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
                <span className="text-sm font-semibold text-black">
                  Customers acquired per month
                </span>
                <div className="mt-3 flex items-center rounded-askrami border border-surface-border bg-white px-4">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={values.custAcq}
                    onChange={(event) => updateValue("custAcq", event.target.value)}
                    className="w-full bg-transparent py-3 text-base font-semibold text-black outline-none"
                  />
                </div>
              </label>

              <label className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
                <span className="text-sm font-semibold text-black">
                  Average order value
                </span>
                <div className="mt-3 flex items-center rounded-askrami border border-surface-border bg-white px-4">
                  <span className="text-sm font-semibold text-neutral-muted">$</span>
                  <input
                    type="number"
                    min={10}
                    step={5}
                    value={values.aov}
                    onChange={(event) => updateValue("aov", event.target.value)}
                    className="w-full bg-transparent px-2 py-3 text-base font-semibold text-black outline-none"
                  />
                </div>
              </label>

              <label className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
                <span className="text-sm font-semibold text-black">
                  Monthly site visitors
                </span>
                <div className="mt-3 flex items-center rounded-askrami border border-surface-border bg-white px-4">
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={values.visitors}
                    onChange={(event) => updateValue("visitors", event.target.value)}
                    className="w-full bg-transparent py-3 text-base font-semibold text-black outline-none"
                  />
                </div>
              </label>
            </div>

            <div className="grid gap-4 self-start">
              <div className="rounded-askrami border border-surface-border bg-surface-subtle p-6 text-center">
                <p className="text-4xl font-bold tracking-tight text-black">
                  {formatCurrency(results.cac)}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-muted">
                  Your current CAC
                </p>
              </div>

              <div className="rounded-askrami border border-surface-border bg-surface-subtle p-6 text-center">
                <p className="text-4xl font-bold tracking-tight text-black">
                  {formatCurrency(results.cgoCac)}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-muted">
                  Estimated CGO CAC
                </p>
              </div>

              <div className="rounded-askrami border border-brand/20 bg-brand/5 p-6 text-center">
                <p className="text-4xl font-bold tracking-tight text-brand">
                  {formatCurrency(results.savings)}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-muted">
                  Monthly savings on acquisition
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-askrami border border-surface-border bg-[#f7f5f0] p-5 text-sm leading-relaxed text-neutral-muted">
            <strong className="text-black">How we calculate this:</strong> CGO
            converts visitors who already landed on your site with no additional
            ad cost. We estimate CGO adds about 1.5% conversion on engaged,
            exiting traffic at a flat operational cost versus your current paid
            CAC. Conservative estimate uses a 63% CAC reduction.
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="mt-6 w-full rounded-askrami bg-brand px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-deep focus:outline-none focus:ring-4 focus:ring-brand/20 sm:w-auto"
          >
            Send my CAC estimate
          </button>

          <p className="mt-5 text-sm font-medium text-black">
            Ready to see your real numbers?{" "}
            <a
              href="https://meetings.hubspot.com/chris-e-daly/customer-demo"
              className="text-brand underline decoration-brand/30 underline-offset-4 transition hover:decoration-brand"
            >
              Book a 20-min demo →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
