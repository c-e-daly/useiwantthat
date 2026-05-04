import posthog from "posthog-js";

export type ProphetCalculatorEvent = {
  icp_persona: string;
  inputs: {
    monthly_ad_spend: number;
    cost_per_click: number;
    average_order_value: number;
    gross_margin_pct: number;
    paid_cvr_pct: number;
    organic_visitors: number;
  };
  outputs: {
    cac: number;
    annual_revenue_unlocked: number;
    organic_lift_revenue_monthly: number;
    prophet_roi_vs_ad_spend_pct: number;
    orders_to_breakeven: number;
  };
  segmentation: {
    revenue_band: string;
    cac_severity: string;
    high_cac_flag: boolean;
    offer_opportunity_score: number;
  };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      eventParameters?: Record<string, unknown>
    ) => void;
  }
}

export function trackProphetCalculatorSubmit(event: ProphetCalculatorEvent) {
  if (typeof window === "undefined") return;

  const payload = {
    calculator_version: "1.0",
    timestamp: new Date().toISOString(),
    ...event,
    monthly_ad_spend: event.inputs.monthly_ad_spend,
    cost_per_click: event.inputs.cost_per_click,
    average_order_value: event.inputs.average_order_value,
    gross_margin_pct: event.inputs.gross_margin_pct,
    paid_cvr_pct: event.inputs.paid_cvr_pct,
    organic_visitors: event.inputs.organic_visitors,
    cac: event.outputs.cac,
    annual_revenue_unlocked: event.outputs.annual_revenue_unlocked,
    organic_lift_revenue_monthly: event.outputs.organic_lift_revenue_monthly,
    prophet_roi_vs_ad_spend_pct: event.outputs.prophet_roi_vs_ad_spend_pct,
    orders_to_breakeven: event.outputs.orders_to_breakeven,
    revenue_band: event.segmentation.revenue_band,
    cac_severity: event.segmentation.cac_severity,
    high_cac_flag: event.segmentation.high_cac_flag,
    offer_opportunity_score: event.segmentation.offer_opportunity_score,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "prophet_calculator_submit",
    ...payload,
  });

  posthog.capture("prophet calculator submitted", payload);
  window.gtag?.("event", "prophet_calculator_submit", payload);
}
