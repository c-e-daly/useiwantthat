import posthog from "posthog-js";

export type GoodnessOfFitAnswers = {
  discounts: { score: number; answer: string };
  customers: { score: number; answer: string };
  cac: { score: number; answer: string };
  pricing: { score: number; answer: string };
  inventory: { score: number; answer: string };
  analytics: { score: number; answer: string };
  agents: { score: number; answer: string };
  mindset: { score: number; answer: string };
};

export type GoodnessOfFitEvent = {
  assessment: {
    fit_score: number;
    readiness_level: string;
    strategic_fit: string;
    operational_gap: string;
    alignment_pct: number;
    setup_pct: number;
    resistance_pct: number;
    strong_fit_count: number;
    setup_gap_count: number;
    resistance_count: number;
  };
  answers: GoodnessOfFitAnswers;
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

function flattenAnswers(answers: GoodnessOfFitAnswers) {
  return {
    q_discounts_score: answers.discounts.score,
    q_discounts_answer: answers.discounts.answer,
    q_customers_score: answers.customers.score,
    q_customers_answer: answers.customers.answer,
    q_cac_score: answers.cac.score,
    q_cac_answer: answers.cac.answer,
    q_pricing_score: answers.pricing.score,
    q_pricing_answer: answers.pricing.answer,
    q_inventory_score: answers.inventory.score,
    q_inventory_answer: answers.inventory.answer,
    q_analytics_score: answers.analytics.score,
    q_analytics_answer: answers.analytics.answer,
    q_agents_score: answers.agents.score,
    q_agents_answer: answers.agents.answer,
    q_mindset_score: answers.mindset.score,
    q_mindset_answer: answers.mindset.answer,
  };
}

export function trackGoodnessOfFitSubmit(event: GoodnessOfFitEvent) {
  if (typeof window === "undefined") return;

  const payload = {
    tool_version: "1.0",
    timestamp: new Date().toISOString(),
    ...event.assessment,
    ...flattenAnswers(event.answers),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "negotiated_commerce_fit_submit",
    ...payload,
  });

  posthog.capture("negotiated commerce fit submitted", payload);
  window.gtag?.("event", "negotiated_commerce_fit_submit", payload);
}
