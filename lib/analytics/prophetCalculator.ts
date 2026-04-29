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
  }
}

export function trackProphetCalculatorSubmit(event: ProphetCalculatorEvent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "prophet_calculator_submit",
    calculator_version: "1.0",
    timestamp: new Date().toISOString(),
    ...event,
  });
}
