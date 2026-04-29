"use client";

import { useMemo, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type CalculatorState = {
  adSpend: number;
  cpc: number;
  aov: number;
  margin: number;
  paidCvr: number;
  orgCvr: number;
  prophetLift: number;
  orgVisitors: number;
};

type CalculatorResults = {
  paidClicks: number;
  paidConversions: number;
  paidRevenue: number;
  grossProfitPerOrder: number;
  cac: number;
  ordersBreakEven: number;
  orgConvCurrent: number;
  orgConvProphet: number;
  additionalOrders: number;
  additionalRevenue: number;
  additionalGrossProfit: number;
  annualUnlocked: number;
  annualAdSpend: number;
  annualAdRevenue: number;
  orgRevenueCurrent: number;
  prophetRoiVsAdSpendPct: number;
  paidBar: number;
  orgBar: number;
  liftBar: number;
};

const initialState: CalculatorState = {
  adSpend: 3000,
  cpc: 4,
  aov: 65,
  margin: 45,
  paidCvr: 1.4,
  orgCvr: 2.2,
  prophetLift: 1.8,
  orgVisitors: 5000,
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return `$${numberFormatter.format(Math.round(value))}`;
}

function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value));
}

function clampFinite(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

function getCacSeverity(adTaxRatio: number) {
  if (adTaxRatio >= 3) return "critical";
  if (adTaxRatio >= 2) return "high";
  if (adTaxRatio >= 1) return "moderate";
  return "healthy";
}

function getOfferOpportunityScore(
  results: CalculatorResults
) {
  return Math.round(results.additionalRevenue / 24);
}

export function CacCalculatorClient() {
  const [values, setValues] = useState<CalculatorState>(initialState);
  const [submittedResults, setSubmittedResults] =
    useState<CalculatorResults | null>(null);

  const results = useMemo<CalculatorResults>(() => {
    const adSpend = clampFinite(values.adSpend, 0);
    const cpc = clampFinite(values.cpc, 1) || 1;
    const aov = clampFinite(values.aov, 1);
    const margin = clampFinite(values.margin, 45) / 100;
    const paidCvr = clampFinite(values.paidCvr, 0) / 100;
    const orgCvr = clampFinite(values.orgCvr, 0) / 100;
    const prophetLift = clampFinite(values.prophetLift, 0) / 100;
    const orgVisitors = clampFinite(values.orgVisitors, 0);

    const paidClicks = Math.round(adSpend / cpc);
    const paidConversions = Math.round(paidClicks * paidCvr);
    const paidRevenue = paidConversions * aov;
    const grossProfitPerOrder = aov * margin;
    const cac = paidConversions > 0 ? adSpend / paidConversions : 0;
    const ordersBreakEven =
      grossProfitPerOrder > 0 ? Math.ceil(cac / grossProfitPerOrder) : 0;

    const orgConvCurrent = Math.round(orgVisitors * orgCvr);
    const orgConvProphet = Math.round(orgVisitors * (orgCvr + prophetLift));
    const additionalOrders = orgConvProphet - orgConvCurrent;
    const additionalRevenue = additionalOrders * aov;
    const additionalGrossProfit = additionalRevenue * margin;
    const annualUnlocked = additionalRevenue * 12;
    const annualAdSpend = adSpend * 12;
    const annualAdRevenue = paidRevenue * 12;
    const orgRevenueCurrent = orgConvCurrent * aov;
    const maxBar = Math.max(paidRevenue, orgRevenueCurrent, additionalRevenue, 1);
    const prophetRoiVsAdSpendPct =
      annualAdSpend > 0 ? Math.round((annualUnlocked / annualAdSpend) * 100) : 0;

    return {
      paidClicks,
      paidConversions,
      paidRevenue,
      grossProfitPerOrder,
      cac,
      ordersBreakEven,
      orgConvCurrent,
      orgConvProphet,
      additionalOrders,
      additionalRevenue,
      additionalGrossProfit,
      annualUnlocked,
      annualAdSpend,
      annualAdRevenue,
      orgRevenueCurrent,
      prophetRoiVsAdSpendPct,
      paidBar: Math.round((paidRevenue / maxBar) * 100),
      orgBar: Math.round((orgRevenueCurrent / maxBar) * 100),
      liftBar: Math.round((additionalRevenue / maxBar) * 100),
    };
  }, [values]);

  function updateValue(field: keyof CalculatorState, rawValue: string) {
    setSubmittedResults(null);
    setValues((current) => ({
      ...current,
      [field]: Number(rawValue),
    }));
  }

  function handleCalculate() {
    setSubmittedResults(results);

    if (typeof window === "undefined") return;

    const adTaxRatio = values.aov > 0 ? results.cac / values.aov : 0;
    const segmentation = {
      revenue_band: "50k_150k_annual",
      ad_tax_ratio: Number(adTaxRatio.toFixed(2)),
      high_cac_flag: adTaxRatio >= 2,
      cac_severity: getCacSeverity(adTaxRatio),
      offer_opportunity_score: getOfferOpportunityScore(results),
    };

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: "prophet_calculator_submit",
      calculator_version: "1.0",
      timestamp: new Date().toISOString(),
      icp_persona: "fashion_apparel",
      inputs: {
        monthly_ad_spend: values.adSpend,
        cost_per_click: values.cpc,
        average_order_value: values.aov,
        gross_margin_pct: values.margin,
        paid_cvr_pct: values.paidCvr,
        organic_cvr_pct: values.orgCvr,
        prophet_lift_pct: values.prophetLift,
        organic_visitors: values.orgVisitors,
      },
      outputs: {
        cac: Math.round(results.cac),
        orders_to_breakeven: results.ordersBreakEven,
        gross_profit_per_order: Math.round(results.grossProfitPerOrder),
        paid_revenue_monthly: Math.round(results.paidRevenue),
        organic_lift_revenue_monthly: Math.round(results.additionalRevenue),
        annual_revenue_unlocked: Math.round(results.annualUnlocked),
        annual_ad_spend: Math.round(results.annualAdSpend),
        prophet_roi_vs_ad_spend_pct: results.prophetRoiVsAdSpendPct,
      },
      segmentation,
    });
  }

  return (
    <div className="rounded-askrami border border-surface-border bg-white p-5 shadow-xl md:p-6">
      <h2 className="sr-only">
        CAC cost calculator for ad spend versus organic traffic revenue recovery
      </h2>

      <p className="text-xs font-bold uppercase tracking-widest text-brand">
        Your store
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <NumberField
          label="Monthly ad spend"
          prefix="$"
          min={0}
          step={100}
          value={values.adSpend}
          onChange={(value) => updateValue("adSpend", value)}
        />
        <NumberField
          label="Cost per click"
          prefix="$"
          min={0.01}
          step={0.5}
          value={values.cpc}
          onChange={(value) => updateValue("cpc", value)}
        />
        <NumberField
          label="Average order value"
          prefix="$"
          min={1}
          step={5}
          value={values.aov}
          onChange={(value) => updateValue("aov", value)}
        />
        <NumberField
          label="Gross margin"
          suffix="%"
          min={1}
          max={99}
          step={1}
          value={values.margin}
          onChange={(value) => updateValue("margin", value)}
        />
      </div>

      <div className="mt-6 space-y-4">
        <RangeField
          label="Current store CVR"
          min={0.5}
          max={5}
          step={0.1}
          value={values.paidCvr}
          output={`${values.paidCvr.toFixed(1)}%`}
          onChange={(value) => updateValue("paidCvr", value)}
        />
        <RangeField
          label="Organic / direct CVR"
          min={0.5}
          max={8}
          step={0.1}
          value={values.orgCvr}
          output={`${values.orgCvr.toFixed(1)}%`}
          onChange={(value) => updateValue("orgCvr", value)}
        />
        <RangeField
          label="Prophet CVR lift"
          min={0.5}
          max={4}
          step={0.1}
          value={values.prophetLift}
          output={`+${values.prophetLift.toFixed(1)}%`}
          onChange={(value) => updateValue("prophetLift", value)}
        />
        <RangeField
          label="Monthly organic / direct visitors"
          min={500}
          max={50000}
          step={500}
          value={values.orgVisitors}
          output={formatNumber(values.orgVisitors)}
          onChange={(value) => updateValue("orgVisitors", value)}
        />
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-6 w-full rounded-askrami bg-brand px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-deep focus:outline-none focus:ring-4 focus:ring-brand/20"
      >
        Calculate my savings
      </button>

      {!submittedResults ? (
        <div className="mt-6 rounded-askrami border border-surface-border bg-surface-subtle p-5 text-center">
          <p className="text-sm font-semibold text-black">
            Your savings report will appear here.
          </p>
          <p className="mt-1 text-sm text-neutral-muted">
            Choose your inputs, then calculate to reveal the CAC and organic
            lift breakdown.
          </p>
        </div>
      ) : (
        <CalculatorResultsPanel results={submittedResults} />
      )}
    </div>
  );
}

function CalculatorResultsPanel({ results }: { results: CalculatorResults }) {
  return (
    <>
      <div className="my-6 h-px bg-surface-border" />

      <p className="text-xs font-bold uppercase tracking-widest text-brand">
        The ad tax
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Metric label="Paid clicks per month" value={formatNumber(results.paidClicks)} />
        <Metric label="Paid conversions" value={formatNumber(results.paidConversions)} />
        <Metric
          label="CAC"
          value={results.paidConversions > 0 ? formatCurrency(results.cac) : "N/A"}
          tone="danger"
        />
        <Metric
          label="Gross profit per order"
          value={formatCurrency(results.grossProfitPerOrder)}
        />
        <Metric
          label="Orders to break even"
          value={`${results.ordersBreakEven}x`}
          tone="danger"
        />
        <Metric label="Paid revenue" value={formatCurrency(results.paidRevenue)} />
      </div>

      <div className="my-6 h-px bg-surface-border" />

      <p className="text-xs font-bold uppercase tracking-widest text-brand">
        Prophet on organic
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Metric
          label="Organic conversions now"
          value={formatNumber(results.orgConvCurrent)}
        />
        <Metric
          label="Organic conversions with Prophet"
          value={formatNumber(results.orgConvProphet)}
          tone="positive"
        />
        <Metric
          label="Additional orders"
          value={formatNumber(results.additionalOrders)}
          tone="positive"
        />
        <Metric
          label="Additional revenue"
          value={formatCurrency(results.additionalRevenue)}
          tone="positive"
        />
        <Metric label="CAC on organic lift" value="$0" tone="positive" />
        <Metric
          label="Gross profit added"
          value={formatCurrency(results.additionalGrossProfit)}
          tone="positive"
        />
      </div>

      <div className="mt-6 rounded-askrami border border-brand/20 bg-brand/5 p-5">
        <p className="text-sm font-semibold text-brand">
          Annual revenue unlocked from traffic you already have
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-brand">
          {formatCurrency(results.annualUnlocked)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
          vs {formatCurrency(results.annualAdSpend)} spent on ads generating{" "}
          {formatCurrency(results.annualAdRevenue)} in revenue
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">
          Revenue mix
        </p>
        <div className="mt-4 space-y-4">
          <Bar
            label="Paid ad revenue"
            value={`${formatCurrency(results.paidRevenue)} / mo`}
            width={results.paidBar}
            className="bg-orange-600"
          />
          <Bar
            label="Organic revenue now"
            value={`${formatCurrency(results.orgRevenueCurrent)} / mo`}
            width={results.orgBar}
            className="bg-emerald-600"
          />
          <Bar
            label="Prophet lift on organic"
            value={`${formatCurrency(results.additionalRevenue)} / mo`}
            width={results.liftBar}
            className="bg-brand"
          />
        </div>
      </div>

      <p className="mt-6 rounded-askrami border border-surface-border bg-surface-subtle p-4 text-sm leading-relaxed text-neutral-muted">
        At your current CAC of {formatCurrency(results.cac)}, you need a customer
        to order {results.ordersBreakEven}x before paid acquisition breaks even
        against gross profit. Prophet&apos;s organic lift adds revenue at $0 CAC,
        so every dollar goes straight to margin contribution.
      </p>
    </>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  step: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: string) => void;
};

function NumberField({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
      <span className="text-sm font-semibold text-black">{label}</span>
      <span className="mt-3 flex items-center rounded-askrami border border-surface-border bg-white px-3">
        {prefix ? (
          <span className="text-sm font-semibold text-neutral-muted">{prefix}</span>
        ) : null}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full min-w-0 bg-transparent px-2 py-3 text-base font-semibold text-black outline-none"
        />
        {suffix ? (
          <span className="text-sm font-semibold text-neutral-muted">{suffix}</span>
        ) : null}
      </span>
    </label>
  );
}

type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  output: string;
  onChange: (value: string) => void;
};

function RangeField({
  label,
  value,
  min,
  max,
  step,
  output,
  onChange,
}: RangeFieldProps) {
  return (
    <label className="grid gap-2 rounded-askrami border border-surface-border bg-white p-4">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-black">{label}</span>
        <span className="shrink-0 text-sm font-bold text-brand">{output}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-2 w-full accent-brand"
      />
    </label>
  );
}

type MetricProps = {
  label: string;
  value: string;
  tone?: "default" | "positive" | "danger";
};

function Metric({ label, value, tone = "default" }: MetricProps) {
  const toneClassName =
    tone === "positive"
      ? "text-emerald-700"
      : tone === "danger"
        ? "text-orange-700"
        : "text-black";

  return (
    <div className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-muted">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold tracking-tight ${toneClassName}`}>
        {value}
      </p>
    </div>
  );
}

type BarProps = {
  label: string;
  value: string;
  width: number;
  className: string;
};

function Bar({ label, value, width, className }: BarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-black">{label}</span>
        <span className="shrink-0 text-neutral-muted">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-subtle">
        <div
          className={`h-full rounded-full transition-all ${className}`}
          style={{ width: `${Math.max(width, 4)}%` }}
        />
      </div>
    </div>
  );
}
