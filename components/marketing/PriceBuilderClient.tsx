"use client";

import { useMemo, useState } from "react";

type PriceBuilderState = {
  cogs: number;
  profitMarkup: number;
  shrinkAllowance: number;
  financingAllowance: number;
  shippingAllowance: number;
  discountAllowance: number;
  marketAdjustAllowance: number;
};

type Scenario = {
  label: string;
  description: string;
  currentGrossProfit: number;
  protectedGrossProfit: number;
  currentMargin: number;
  protectedMargin: number;
};

const initialState: PriceBuilderState = {
  cogs: 45,
  profitMarkup: 55,
  shrinkAllowance: 2,
  financingAllowance: 3.25,
  shippingAllowance: 8,
  discountAllowance: 10,
  marketAdjustAllowance: 4,
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.round(value));
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function clampFinite(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

function calculateScenarioProfit({
  sellingPrice,
  values,
  discountAllowance = 0,
  shippingAllowance = 0,
}: {
  sellingPrice: number;
  values: PriceBuilderState;
  discountAllowance?: number;
  shippingAllowance?: number;
}) {
  return (
    sellingPrice -
    values.cogs -
    values.financingAllowance -
    values.shrinkAllowance -
    values.marketAdjustAllowance -
    discountAllowance -
    shippingAllowance
  );
}

export function PriceBuilderClient() {
  const [values, setValues] = useState<PriceBuilderState>(initialState);

  const results = useMemo(() => {
    const safeValues = {
      cogs: Math.max(clampFinite(values.cogs, 0), 0),
      profitMarkup: Math.max(clampFinite(values.profitMarkup, 0), 0),
      shrinkAllowance: Math.max(clampFinite(values.shrinkAllowance, 0), 0),
      financingAllowance: Math.max(
        clampFinite(values.financingAllowance, 0),
        0
      ),
      shippingAllowance: Math.max(clampFinite(values.shippingAllowance, 0), 0),
      discountAllowance: Math.max(clampFinite(values.discountAllowance, 0), 0),
      marketAdjustAllowance: Math.max(
        clampFinite(values.marketAdjustAllowance, 0),
        0
      ),
    };

    const targetProfit = safeValues.profitMarkup;
    const shopifyPrice = safeValues.cogs + targetProfit;
    const totalAllowanceDollars =
      safeValues.shrinkAllowance +
      safeValues.financingAllowance +
      safeValues.shippingAllowance +
      safeValues.discountAllowance +
      safeValues.marketAdjustAllowance;
    const protectedPrice = shopifyPrice + totalAllowanceDollars;
    const protectedGrossProfit =
      protectedPrice - safeValues.cogs - totalAllowanceDollars;
    const shopifyGrossProfit = shopifyPrice - safeValues.cogs;
    const opportunityCost = totalAllowanceDollars;
    const tenPercentDiscount = shopifyPrice * 0.1;
    const twentyPercentDiscount = shopifyPrice * 0.2;

    const scenarios: Scenario[] = [
      {
        label: "10% discount",
        description: `${formatCurrency(tenPercentDiscount)} discount on a ${formatCurrency(shopifyPrice)} item.`,
        currentGrossProfit: calculateScenarioProfit({
          sellingPrice: shopifyPrice,
          values: safeValues,
          discountAllowance: tenPercentDiscount,
        }),
        protectedGrossProfit: calculateScenarioProfit({
          sellingPrice: protectedPrice,
          values: safeValues,
          discountAllowance: tenPercentDiscount,
        }),
        currentMargin: 0,
        protectedMargin: 0,
      },
      {
        label: "20% discount",
        description: `${formatCurrency(twentyPercentDiscount)} discount on a ${formatCurrency(shopifyPrice)} item.`,
        currentGrossProfit: calculateScenarioProfit({
          sellingPrice: shopifyPrice,
          values: safeValues,
          discountAllowance: twentyPercentDiscount,
        }),
        protectedGrossProfit: calculateScenarioProfit({
          sellingPrice: protectedPrice,
          values: safeValues,
          discountAllowance: twentyPercentDiscount,
        }),
        currentMargin: 0,
        protectedMargin: 0,
      },
      {
        label: "Free shipping",
        description: `${formatCurrency(safeValues.shippingAllowance)} absorbed as a unit-level cost.`,
        currentGrossProfit: calculateScenarioProfit({
          sellingPrice: shopifyPrice,
          values: safeValues,
          shippingAllowance: safeValues.shippingAllowance,
        }),
        protectedGrossProfit: calculateScenarioProfit({
          sellingPrice: protectedPrice,
          values: safeValues,
          shippingAllowance: safeValues.shippingAllowance,
        }),
        currentMargin: 0,
        protectedMargin: 0,
      },
    ].map((scenario) => ({
      ...scenario,
      currentMargin:
        shopifyPrice > 0
          ? Math.round((scenario.currentGrossProfit / shopifyPrice) * 100)
          : 0,
      protectedMargin:
        protectedPrice > 0
          ? Math.round((scenario.protectedGrossProfit / protectedPrice) * 100)
          : 0,
    }));

    return {
      ...safeValues,
      shopifyPrice,
      protectedPrice,
      shopifyGrossProfit,
      protectedGrossProfit,
      targetProfit,
      totalAllowanceDollars,
      opportunityCost,
      scenarios,
    };
  }, [values]);

  function updateValue(field: keyof PriceBuilderState, rawValue: string) {
    setValues((current) => ({
      ...current,
      [field]: Number(rawValue),
    }));
  }

  return (
    <div className="rounded-askrami border border-surface-border bg-white p-5 shadow-xl md:p-6">
      <h2 className="sr-only">Price Builder unit economics calculator</h2>

      <p className="text-xs font-bold uppercase tracking-widest text-brand">
        Unit economics
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <NumberField
          label="Cost of goods sold"
          prefix="$"
          min={0}
          step={1}
          value={values.cogs}
          onChange={(value) => updateValue("cogs", value)}
        />
        <NumberField
          label="Profit markup"
          prefix="$"
          min={0}
          step={1}
          value={values.profitMarkup}
          onChange={(value) => updateValue("profitMarkup", value)}
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">
          Allowances
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Shrink"
            prefix="$"
            min={0}
            step={0.25}
            value={values.shrinkAllowance}
            onChange={(value) => updateValue("shrinkAllowance", value)}
          />
          <NumberField
            label="Financing"
            prefix="$"
            min={0}
            step={0.25}
            value={values.financingAllowance}
            onChange={(value) => updateValue("financingAllowance", value)}
          />
          <NumberField
            label="Shipping"
            prefix="$"
            min={0}
            step={1}
            value={values.shippingAllowance}
            onChange={(value) => updateValue("shippingAllowance", value)}
          />
          <NumberField
            label="Discounts"
            prefix="$"
            min={0}
            step={0.25}
            value={values.discountAllowance}
            onChange={(value) => updateValue("discountAllowance", value)}
          />
          <NumberField
            label="Market adjust"
            prefix="$"
            min={0}
            step={0.25}
            value={values.marketAdjustAllowance}
            onChange={(value) => updateValue("marketAdjustAllowance", value)}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric
          label="Shopify price"
          value={formatCurrency(results.shopifyPrice)}
        />
        <Metric
          label="Price Builder price"
          value={formatCurrency(results.protectedPrice)}
          tone="positive"
        />
        <Metric
          label="Allowance Shield"
          value={formatCurrency(results.opportunityCost)}
          tone="positive"
        />
      </div>

      <div className="mt-6 rounded-askrami border border-brand/20 bg-brand/5 p-5">
        <p className="text-sm font-semibold text-brand">
          Protected gross profit per unit
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-brand">
          {formatCurrency(results.protectedGrossProfit)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
          Shopify markup creates {formatCurrency(results.shopifyGrossProfit)} of
          gross profit before allowances. Price Builder includes{" "}
          {formatCurrency(results.totalAllowanceDollars)} in unit-level
          opportunity costs before elasticity programs start.
        </p>
      </div>

      <div className="my-6 h-px bg-surface-border" />

      <p className="text-xs font-bold uppercase tracking-widest text-brand">
        Gross profit under common offers
      </p>
      <div className="mt-4 space-y-4">
        {results.scenarios.map((scenario) => (
          <ScenarioBar key={scenario.label} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: string) => void;
};

function NumberField({
  label,
  value,
  min,
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

type MetricProps = {
  label: string;
  value: string;
  tone?: "default" | "positive";
};

function Metric({ label, value, tone = "default" }: MetricProps) {
  return (
    <div className="rounded-askrami border border-surface-border bg-surface-subtle p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-muted">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-bold tracking-tight ${
          tone === "positive" ? "text-brand" : "text-black"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ScenarioBar({ scenario }: { scenario: Scenario }) {
  const maxValue = Math.max(
    Math.abs(scenario.currentGrossProfit),
    Math.abs(scenario.protectedGrossProfit),
    1
  );
  const currentWidth = Math.max(
    Math.round((Math.abs(scenario.currentGrossProfit) / maxValue) * 100),
    4
  );
  const protectedWidth = Math.max(
    Math.round((Math.abs(scenario.protectedGrossProfit) / maxValue) * 100),
    4
  );

  return (
    <div className="rounded-askrami border border-surface-border bg-white p-4">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold text-black">{scenario.label}</p>
          <p className="text-sm text-neutral-muted">{scenario.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ProfitBar
          label="Current price"
          value={scenario.currentGrossProfit}
          margin={scenario.currentMargin}
          width={currentWidth}
          className={
            scenario.currentGrossProfit < 0 ? "bg-orange-700" : "bg-orange-500"
          }
        />
        <ProfitBar
          label="Price Builder"
          value={scenario.protectedGrossProfit}
          margin={scenario.protectedMargin}
          width={protectedWidth}
          className={
            scenario.protectedGrossProfit < 0 ? "bg-orange-700" : "bg-brand"
          }
        />
      </div>
    </div>
  );
}

function ProfitBar({
  label,
  value,
  margin,
  width,
  className,
}: {
  label: string;
  value: number;
  margin: number;
  width: number;
  className: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-black">{label}</span>
        <span className="shrink-0 text-neutral-muted">
          {formatCurrency(value)} ({formatPercent(margin)})
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-subtle">
        <div
          className={`h-full rounded-full transition-all ${className}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
