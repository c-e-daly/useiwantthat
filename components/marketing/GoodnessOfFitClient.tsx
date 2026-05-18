"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Info,
  Layers3,
  ShieldCheck,
  X,
} from "lucide-react";
import { trackGoodnessOfFitSubmit } from "@/lib/analytics/goodnessOfFit";

type Question = {
  id: string;
  title: string;
  help: string;
  options: [
    { score: 0; key: string; label: string },
    { score: 5; key: string; label: string },
    { score: 10; key: string; label: string },
  ];
  strength: string;
  risk: string;
};

type AnswerState = Record<string, 0 | 5 | 10>;

const questions: Question[] = [
  {
    id: "discounts",
    title: "How do you view discounts?",
    help: "Negotiated commerce treats discounts as pricing allowances and opportunity cost, not automatic margin destruction.",
    options: [
      { score: 0, key: "avoid_discounts", label: "Discounts hurt the brand and margins. We avoid them." },
      { score: 5, key: "useful_unmeasured", label: "Discounts are useful, but we do not measure them well yet." },
      { score: 10, key: "managed_allowances", label: "Discounts are already priced into my model and should be managed intelligently." },
    ],
    strength:
      "You understand that discounts can be managed as pricing allowances instead of treated as automatic margin damage.",
    risk: "Clarify whether discounts are margin-destroying promotions or pre-planned pricing allowances.",
  },
  {
    id: "customers",
    title: "How do you think about customers?",
    help: "The model works best when you believe different customers create value in different ways.",
    options: [
      { score: 0, key: "discount_customers_low_value", label: "Heavy discount customers are not worth our time." },
      { score: 5, key: "best_customers_segmentation", label: "We care mostly about our best customers but want better segmentation." },
      { score: 10, key: "every_customer_may_have_value", label: "Every customer may have value if we understand the right price and moment." },
    ],
    strength:
      "You are willing to look for value across the full customer base, not only the easiest full-price buyer.",
    risk: "Reframe discount-seeking customers as potential portfolio contributors, not automatically low-value buyers.",
  },
  {
    id: "cac",
    title: "How do you manage acquisition?",
    help: "If CAC is rising, increasing customer yield from existing traffic becomes a strategic lever.",
    options: [
      { score: 0, key: "high_cac_acceptable", label: "We are fine paying high CAC as long as first-order performance looks acceptable." },
      { score: 5, key: "campaign_channel_optimization", label: "CAC matters, but we still mostly optimize campaigns and channels." },
      { score: 10, key: "need_more_existing_traffic_yield", label: "CAC is expensive and we need more conversion from the traffic we already have." },
    ],
    strength:
      "You recognize that improving customer yield from existing traffic can be more profitable than simply buying more traffic.",
    risk: "Measure whether paid acquisition requires repeat orders to break even against gross profit.",
  },
  {
    id: "pricing",
    title: "How do you price products?",
    help: "Strong fit requires understanding COGS, markup, and allowances like shipping, shrink, finance, and markdown room.",
    options: [
      { score: 0, key: "competitor_simple_margin", label: "We mostly price by competitor checks or simple margin targets." },
      { score: 5, key: "general_margin_needs_allowances", label: "We know margin generally, but item-level allowance logic needs work." },
      { score: 10, key: "product_economics_margin_floors", label: "We understand product-level economics and can define protected margin floors." },
    ],
    strength:
      "You have the foundation to protect profit with item-level floors, COGS, markup, and allowance logic.",
    risk: "Build item-level economics before automating offer decisions: COGS, markup, shipping, shrink, finance, and discount allowances.",
  },
  {
    id: "inventory",
    title: "How do you handle inventory and clearance?",
    help: "Negotiation is especially useful when fixed sale prices leave money on the table.",
    options: [
      { score: 0, key: "no_inventory_pressure", label: "We rarely have inventory pressure and do not want flexible pricing." },
      { score: 5, key: "sales_no_price_discovery", label: "We run sales, but have not tested customer-led price discovery." },
      { score: 10, key: "price_discovery_sell_through", label: "We have inventory where negotiated price discovery could improve sell-through and margin." },
    ],
    strength:
      "You have situations where customer-led price discovery can improve sell-through without defaulting to blanket markdowns.",
    risk: "Identify where flexible pricing can outperform fixed clearance pricing.",
  },
  {
    id: "analytics",
    title: "How do you evaluate performance?",
    help: "The manifesto favors customer portfolio management over simple cohort thinking.",
    options: [
      { score: 0, key: "revenue_roas_cvr_only", label: "We mostly watch revenue, ROAS, and conversion rate." },
      { score: 5, key: "cohorts_need_customer_intelligence", label: "We use cohorts and reports, but need better customer intelligence." },
      { score: 10, key: "portfolio_level_analysis", label: "We want portfolio-level analysis: New, Stable, Growth, Declining, Reactivated, Defected." },
    ],
    strength:
      "You are ready to evaluate customers by portfolio behavior instead of relying only on channel or cohort reporting.",
    risk: "Move beyond revenue and ROAS into customer portfolios, deciles, retention, reactivation, and margin contribution.",
  },
  {
    id: "agents",
    title: "How do you feel about agentic commerce?",
    help: "Future fit improves if you want AI agents and shoppers to know your store can receive offers.",
    options: [
      { score: 0, key: "no_agent_negotiation", label: "We do not want agents or shoppers negotiating with us." },
      { score: 5, key: "agentic_interesting_later", label: "Interesting, but not immediate." },
      { score: 10, key: "ready_for_agentic_offers", label: "We want to be ready for AI-agent traffic and offer-capable commerce." },
    ],
    strength:
      "You are thinking ahead to agentic commerce, where offer capability becomes a competitive signal.",
    risk: "Decide whether offer-capable AI-agent traffic should become part of your future commerce strategy.",
  },
  {
    id: "mindset",
    title: "What is your operating mindset?",
    help: "This system is for operators willing to test, measure, counter, and learn.",
    options: [
      { score: 0, key: "fixed_prices_minimal_testing", label: "We prefer fixed rules, fixed prices, and minimal experimentation." },
      { score: 5, key: "open_with_guardrails", label: "We are open to testing if the guardrails are clear." },
      { score: 10, key: "test_counter_measure_learn", label: "We are grinders. We will test offers, counteroffers, portfolios, and margin rules." },
    ],
    strength:
      "You have the operating mindset to test, counter, measure, and improve negotiated outcomes.",
    risk: "Negotiated commerce requires testing and learning. Fixed-price-only teams may struggle with the operating model.",
  },
];

const initialAnswers = questions.reduce<AnswerState>((answers, question) => {
  answers[question.id] = 5;
  return answers;
}, {});

function scoreToSliderValue(score: 0 | 5 | 10) {
  return score === 0 ? 0 : score === 5 ? 1 : 2;
}

function sliderValueToScore(value: string): 0 | 5 | 10 {
  if (value === "0") return 0;
  if (value === "1") return 5;
  return 10;
}

function answerLabel(question: Question, score: 0 | 5 | 10) {
  return question.options.find((option) => option.score === score)?.label ?? "";
}

function answerKey(question: Question, score: 0 | 5 | 10) {
  return question.options.find((option) => option.score === score)?.key ?? "unknown";
}

function getAssessment(answers: AnswerState) {
  const values = questions.map((question) => answers[question.id]);
  const total = values.reduce<number>((sum, value) => sum + value, 0);
  const score = Math.round((total / (questions.length * 10)) * 100);
  const setup = Math.round((values.filter((value) => value === 5).length / questions.length) * 100);
  const resistance = Math.round((values.filter((value) => value === 0).length / questions.length) * 100);

  if (score < 40) {
    return {
      score,
      setup,
      resistance,
      level: "Weak",
      strategic: "Low",
      gap: "High",
      scoreTone: "text-rose-700",
      gapTone: "text-rose-700",
      barTone: "bg-rose-500",
      verdict: "You are probably not ready for negotiated commerce.",
      sub: "Your answers show meaningful resistance to the operating model. Start with pricing discipline, customer portfolio thinking, and CAC economics before adding negotiation.",
      note: "Your best next step is not a negotiation tool. It is a pricing and customer value reset: understand CAC, COGS, margin allowances, and customer portfolios first.",
    };
  }

  if (score < 70) {
    return {
      score,
      setup,
      resistance,
      level: "Emerging",
      strategic: "Moderate",
      gap: "Medium",
      scoreTone: "text-amber-700",
      gapTone: "text-amber-700",
      barTone: "bg-amber-500",
      verdict: "You may be a fit, but the operating model needs work.",
      sub: "There is enough alignment to test negotiated commerce, but you should tighten the margin rules, customer segmentation, and measurement model first.",
      note: "Your best next step is to define item-level economics and customer portfolio goals before opening up offers broadly.",
    };
  }

  return {
    score,
    setup,
    resistance,
    level: "Strong",
    strategic: "High",
    gap: "Low",
    scoreTone: "text-emerald-700",
    gapTone: "text-emerald-700",
    barTone: "bg-emerald-600",
    verdict: "You are a strong fit for negotiated commerce.",
    sub: "Your answers suggest you see pricing, discounts, customer value, and CAC as connected operating levers, not isolated tactics.",
    note: "Your best next step is to pilot negotiated commerce on a defined program: clearance, bounceback, remarketing, or high-CAC traffic recovery. Protect margin floors first, then let customers reveal their price points.",
  };
}

export function GoodnessOfFitClient() {
  const [answers, setAnswers] = useState<AnswerState>(initialAnswers);
  const [submittedAnswers, setSubmittedAnswers] = useState<AnswerState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeQuestion = questions[activeIndex];
  const activeAnswer = answers[activeQuestion.id];
  const assessment = useMemo(() => getAssessment(submittedAnswers ?? answers), [answers, submittedAnswers]);
  const strengths = questions
    .filter((question) => (submittedAnswers ?? answers)[question.id] === 10)
    .map((question) => question.strength);
  const risks = questions
    .filter((question) => (submittedAnswers ?? answers)[question.id] < 10)
    .map((question) => question.risk);

  function updateAnswer(questionId: string, score: 0 | 5 | 10) {
    setAnswers((current) => ({ ...current, [questionId]: score }));
  }

  function startAssessment() {
    setActiveIndex(0);
    setIsOpen(true);
  }

  function submitAssessment() {
    const finalAssessment = getAssessment(answers);

    trackGoodnessOfFitSubmit({
      assessment: {
        fit_score: finalAssessment.score,
        readiness_level: finalAssessment.level.toLowerCase(),
        strategic_fit: finalAssessment.strategic.toLowerCase(),
        operational_gap: finalAssessment.gap.toLowerCase(),
        alignment_pct: finalAssessment.score,
        setup_pct: finalAssessment.setup,
        resistance_pct: finalAssessment.resistance,
        strong_fit_count: questions.filter((question) => answers[question.id] === 10).length,
        setup_gap_count: questions.filter((question) => answers[question.id] === 5).length,
        resistance_count: questions.filter((question) => answers[question.id] === 0).length,
      },
      answers: {
        discounts: { score: answers.discounts, answer: answerKey(questions[0], answers.discounts) },
        customers: { score: answers.customers, answer: answerKey(questions[1], answers.customers) },
        cac: { score: answers.cac, answer: answerKey(questions[2], answers.cac) },
        pricing: { score: answers.pricing, answer: answerKey(questions[3], answers.pricing) },
        inventory: { score: answers.inventory, answer: answerKey(questions[4], answers.inventory) },
        analytics: { score: answers.analytics, answer: answerKey(questions[5], answers.analytics) },
        agents: { score: answers.agents, answer: answerKey(questions[6], answers.agents) },
        mindset: { score: answers.mindset, answer: answerKey(questions[7], answers.mindset) },
      },
    });

    setSubmittedAnswers(answers);
    setIsOpen(false);
  }

  return (
    <>
      <div className="rounded-askrami border border-surface-border bg-white p-5 shadow-xl md:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-askrami bg-brand/10 text-brand">
          <Gauge className="h-6 w-6" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand">
          Eight-question assessment
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-black">
          Find out if your store is ready for negotiated commerce.
        </h2>
        <p className="mt-4 leading-relaxed text-neutral-muted">
          This is not a discount preference quiz. It tests whether your team is ready to use customer generated offers with margin floors, customer portfolios, price discovery, and offer intelligence.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <ReadinessPill icon={ShieldCheck} label="Margin floors" />
          <ReadinessPill icon={Layers3} label="Customer portfolios" />
          <ReadinessPill icon={BarChart3} label="Offer analytics" />
        </div>

        <button
          type="button"
          onClick={startAssessment}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-deep sm:w-auto"
        >
          Start the fit assessment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {submittedAnswers ? (
        <section className="rounded-askrami border border-surface-border bg-white p-5 shadow-sm md:p-6 lg:col-span-2">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="rounded-askrami border border-surface-border bg-surface-subtle/50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-askrami bg-brand/10 text-brand">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">
                    Negotiated commerce is an operating model.
                  </p>
                  <p className="mt-1 text-sm text-neutral-muted">
                    This assessment checks whether the core inputs are in place
                    before you invite customers to name a price.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {[
                  "You see discounts as pricing allowances, not automatic margin destruction.",
                  "You want more yield from the traffic you already paid to acquire.",
                  "You can define margin floors, customer portfolios, and offer rules.",
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-neutral-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Your negotiated commerce fit score
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Metric label="Overall fit score" value={`${assessment.score}/100`} tone={assessment.scoreTone} />
                <Metric label="Readiness level" value={assessment.level} />
                <Metric label="Strategic fit" value={assessment.strategic} />
                <Metric label="Operational gap" value={assessment.gap} tone={assessment.gapTone} />
              </div>

              <div className="mt-6 rounded-askrami border-2 border-brand/25 bg-brand/10 p-5">
                <p className="text-sm font-semibold text-brand">Verdict</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-black">
                  {assessment.verdict}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-muted">
                  {assessment.sub}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <ProgressBar label="Negotiated commerce alignment" value={assessment.score} tone={assessment.barTone} />
            <ProgressBar label="Needs operational setup" value={assessment.setup} tone="bg-amber-500" />
            <ProgressBar label="Anti-fit resistance" value={assessment.resistance} tone="bg-rose-500" />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <DiagnosisCard
              title="What this says about you"
              items={strengths.length ? strengths : ["You have not selected any strong-fit signals yet."]}
            />
            <DiagnosisCard
              title="What to fix before launch"
              items={risks.length ? risks : ["No major readiness gaps based on these answers. Your next step is implementation and measurement."]}
            />
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              Your answers
            </p>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-askrami border border-surface-border bg-surface-subtle/50 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <p className="text-sm font-bold text-black">
                      {index + 1}. {question.title}
                    </p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand">
                      {(submittedAnswers ?? answers)[question.id]}/10
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-muted">
                    {answerLabel(question, (submittedAnswers ?? answers)[question.id])}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-muted">
            {assessment.note}
          </p>

          <button
            type="button"
            onClick={startAssessment}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-askrami border border-surface-border bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
          >
            Re-run assessment
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      ) : null}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fit-assessment-title"
        >
          <div className="w-full max-w-2xl rounded-askrami bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  Question {activeIndex + 1} of {questions.length}
                </p>
                <h2 id="fit-assessment-title" className="mt-1 text-xl font-bold text-black">
                  Negotiated commerce fit assessment
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-askrami border border-surface-border text-black transition hover:bg-surface-subtle"
                aria-label="Close assessment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${((activeIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-black">
                {activeQuestion.title}
              </h3>
              <p className="mt-3 flex gap-2 text-sm leading-relaxed text-neutral-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{activeQuestion.help}</span>
              </p>

              <div className="mt-8">
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={1}
                  value={scoreToSliderValue(activeAnswer)}
                  onChange={(event) => updateAnswer(activeQuestion.id, sliderValueToScore(event.target.value))}
                  className="w-full accent-brand"
                  aria-label={activeQuestion.title}
                />
                <div className="mt-3 grid grid-cols-3 gap-3 text-xs font-semibold text-neutral-muted">
                  <span>Not ready</span>
                  <span className="text-center">Needs setup</span>
                  <span className="text-right">Strong fit</span>
                </div>
              </div>

              <div className="mt-6 rounded-askrami border border-surface-border bg-surface-subtle/60 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  Selected answer
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-black">
                  {answerLabel(activeQuestion, activeAnswer)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-surface-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
                className="rounded-askrami border border-surface-border bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {activeIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={submitAssessment}
                  className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                >
                  Assess our readiness
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveIndex((index) => Math.min(questions.length - 1, index + 1))}
                  className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                >
                  Next question
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ReadinessPill({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-askrami border border-surface-border bg-surface-subtle px-3 py-2 text-sm font-semibold text-slate-800">
      <Icon className="h-4 w-4 text-brand" />
      <span>{label}</span>
    </div>
  );
}

function Metric({ label, value, tone = "text-black" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-askrami bg-surface-subtle p-4">
      <p className="text-sm text-neutral-muted">{label}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${tone}`}>{value}</p>
    </div>
  );
}

function ProgressBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-surface-subtle">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DiagnosisCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-askrami border border-surface-border bg-white p-5">
      <h3 className="text-lg font-bold text-black">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-muted">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
