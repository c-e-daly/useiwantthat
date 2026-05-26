---
content_type: hub
pillar: customer-portfolios
slug: customer-portfolios
title: "Customer Portfolio Management: The Six Behavioral States of Every Store"
status: published
publish_date: 2026-05-21
updated_at: 2026-05-21
author: chris-daly

seo:
  meta_title: "Customer Portfolio Management: The Six Behavioral States of Every Store"
  meta_description: "Your customer file is not one audience. Customer Portfolio Management classifies every buyer into one of six behavioral states using quintile-based migration."
  sitemap_priority: 1.0
  sitemap_changefreq: monthly
  canonical_path: /blog/customer-portfolios
  robots: index, follow

aeo:
  tldr: "The customer file is a portfolio of six behavioral states: New, Reactivated, Growth, Stable, Declining, and Defected. Customer Portfolio Management classifies every buyer into one of those six states using quintile-based scoring across rolling 12-month periods, then prescribes a different offer mechanism for each state."
  key_takeaways:
    - "Cohorts tell you when customers entered the brand. CPM tells you where they are now."
    - "The six portfolios are New, Reactivated, Growth, Stable, Declining, and Defected."
    - "Each portfolio responds to a different offer mechanism, and the wrong offer can accelerate defection."
  faq_schema: true

relationships:
  related_tool: none
  related_playbook: none
  sibling_hubs:
    - /blog/customer-yield
    - /blog/markup-performance
    - /blog/negotiated-commerce
    - /blog/agentic-commerce
  glossary_terms:
    - customer-portfolio-management
    - the-six-portfolios
    - attrition-migration-tracking
    - new-portfolio
    - reactivated-portfolio
    - growth-portfolio
    - stable-portfolio
    - declining-portfolio
    - defected-portfolio
    - settle-price
  og_image: /images/hubs/six-portfolios-diagram.png
---

# Customer Portfolio Management: The Six Behavioral States of Every Store

The customer file is a portfolio of six behavioral states, and the only durable growth strategy is managing the movement between them. Cohorts tell you when customers entered the brand. Customer Portfolio Management, or CPM, tells you where they are now. The framework was engineered 25 years ago for retailers managing billion-dollar files; the math is the same for a Shopify operator at $500K. This pillar is the operating manual for seeing your business as six audiences instead of one, and matching each to the offer mechanism it actually responds to.

**Who this is for:** ecommerce operators with 5,000+ customers on file, where averaging the file produces a number that does not describe any actual customer. If your "average customer" does not match any customer you can think of, you have a portfolio you have not been managing as a portfolio.

## Why Cohort Thinking Fails

Most modern ecommerce content treats the customer file as a stack of cohorts: the January 2024 cohort, the BFCM 2024 cohort, the Q1 2025 cohort. The cohort tells you one thing, when the customer entered the brand, and almost nothing about where they are now. A January 2024 customer who spent $400 in year one and $80 in year two is in the same cohort as a customer who spent $400 in year one and $1,200 in year two. The cohort cannot tell them apart. The portfolio can.

Cohort thinking is a relic of SaaS analytics imported into ecommerce without translation. SaaS works on cohorts because the value of a customer is tied to when they signed up: pricing tiers, contract length, cohort-specific churn dynamics. Ecommerce works on portfolios because the value of a customer is tied to where they are in their lifecycle right now. A customer who entered three years ago can be in any of the six portfolio states today.

**Customer Portfolio Management treats the file as six audiences moving between each other every quarter.** Cohorts measure entry. CPM measures state. The state is what determines what offer the customer responds to, what unit volume they consume, what price points they accept, and whether they are worth investing acquisition dollars to find more of.

## The Six Portfolios

Every customer on file occupies exactly one of six portfolios at any given time. The classifications are produced by comparing two rolling 12-month windows: P1, the most recent 12 months, and P2, the 12 months prior to P1.

**New.** First purchase in P1, no purchase history in P2 or earlier. The newest entrants to the brand. Quintiled within the New population by P1 net sales to identify high-value first-purchasers separately from low-value first-purchasers.

**Reactivated.** Purchase in P1 and purchase in P3, 24-36 months ago, but no purchase in P2. Customers who went dark and came back. Quintiled within the Reactivated population by P1 net sales. Often the highest-margin recovery opportunity in the file.

**Growth.** Purchase in both P1 and P2, with quintile rank improving from P2 to P1, such as Q3 in P2 to Q2 in P1. The portfolio that fuels organic file expansion. These customers are increasing their commitment to the brand and should be invested in accordingly.

**Stable.** Purchase in both P1 and P2, with quintile rank unchanged from P2 to P1. The base of the file. Usually the largest portfolio by customer count and the one most operators take for granted. Stability is not free. Stable customers need retention work to stay Stable.

**Declining.** Purchase in both P1 and P2, with quintile rank dropping from P2 to P1, such as Q2 in P2 to Q3 in P1. The warning portfolio. Declining customers are still buying but spending less than they were, and they will defect next year if the movement is not reversed. This is the portfolio negotiated commerce was built to address.

**Defected.** Purchase in P2, no purchase in P1. Customers who shopped last year and have not this year. The hardest portfolio to recover, but the one that reveals the most about why customers leave. Quintile rank from the prior period, P2 quintile, is preserved so operators can prioritize defection recovery by historical value.

The rule of CPM: every customer is in exactly one portfolio at exactly one quintile. The movement between portfolios, and between quintiles within portfolios, is where retail growth lives or dies.

## How The Portfolios Are Produced

The Six Portfolios are produced by a methodology called Attrition Migration Tracking, or AMT. AMT compares two rolling 12-month windows of customer behavior, P1 and P2, and classifies every customer based on their purchase pattern across both periods. The full mathematical specification is built into Prophet's CPM engine; operators do not need to engineer the model themselves. What follows is the conceptual structure so the framework can be understood and verified.

AMT scores customers in two steps. First, the binary classification: did the customer purchase in P1, in P2, in both, in neither? Combined with a P3 check, 24-36 months ago, for Reactivated detection, this produces the six portfolio buckets. Second, the quintile scoring: within each portfolio, customers are sorted by net sales in the relevant period and assigned to one of five quintiles. Q1 is the top 20%, and Q5 is the bottom 20%. A customer's full classification is portfolio plus quintile, such as Growth Q2 or Declining Q5.

The quintile movement is the diagnostic signal. A customer who was Q1 Stable in P2 and is now Q1 Growth in P1 is a top-tier customer increasing their commitment. A customer who was Q1 in P2 and is now Q3 in P1 is classified as Declining, and Q1-to-Q3 is a much louder alarm than Q4-to-Q5, even though both technically declined.

Cluster posts in this pillar cover the AMT methodology in detail. The hub establishes the framework; the mechanics live in the playbooks.

## The Offer Playbook By Portfolio

The single most operationally valuable consequence of CPM is that each of the six portfolios responds to a different offer mechanism. Sending the wrong offer to the wrong portfolio is worse than sending no offer. It accelerates movement in the wrong direction.

**New -> First-Order Offer.** Welcome series, first-purchase discount, value-exchange capture. The goal is the second order, not the lift on the first. Target Q1 New customers separately from Q5 New customers because they have different second-order trajectories.

**Reactivated -> Win-Back Acknowledgment.** These customers chose to come back. They need recognition, not a discount. A "welcome back" email that references their prior purchase outperforms a percentage-off offer. Discount-led win-backs train customers to wait for the next gap.

**Growth -> Clienteling and Early Access.** Do not discount Growth customers. They are increasing their commitment at posted price, so discounting them is leaving margin on the table and training them to expect less. Reward them with access, not with price.

**Stable -> Retention and Loyalty.** Stable customers need a reason to remain Stable. Loyalty programs, membership benefits, and multi-purchase incentives build switching cost. The threat to the Stable portfolio is silent erosion to Declining, so visibility and gentle re-engagement preserve them.

**Declining -> Customer-Generated Offers.** This is the portfolio negotiated commerce was built for. Declining customers know they are spending less and they know why: competing brands, price sensitivity, life changes. A CGO that lets them propose their price reveals their actual willingness-to-pay and gives the operator a chance to retain margin where a posted discount would forfeit it. Q1 Declining customers, recently top-tier customers who slipped, are the highest-priority CGO targets in the entire file.

**Defected -> Recapture Campaign.** Aggressive offers, often with category or product-line variation based on prior purchase history. Recapture campaigns work in proportion to the customer's prior quintile. Q1 Defected customers justify significantly higher recovery spend than Q5 Defected. A Q1 customer worth $1,200 per year in their prior life justifies a $50 recapture offer; a Q5 customer worth $80 does not.

The playbook above is the default. Specific businesses will refine based on category, margin profile, and operational capacity. The principle is invariant: every portfolio has a different optimal offer mechanism.

## Settle Price As A Portfolio Signal

The Settle Price a customer consistently accepts is itself a portfolio behavior signal, and an unusually clean one. A customer who settles within 5% of posted price across multiple transactions behaves differently than a customer who consistently settles at 25% below. The first is funding the business; the second is being funded by the business.

Settle Price patterns reveal something the portfolios alone cannot: the depth of a customer's position within their quintile. A Q5 Declining customer who only transacts at deep discount is structurally not the ideal customer profile. They are an infrequent buyer using promotional pricing to participate, and acquisition dollars spent finding more of them produce poor file economics. A Q1 Stable customer who consistently settles at posted price is the inverse: a customer the business should be building acquisition models to find lookalikes of.

Cluster posts in this pillar cover Settle Price analysis by portfolio in depth: what the distributions look like, how to interpret them, and how they inform acquisition and ICP refinement.

## Sell-Through And Unit Volume By Portfolio

Sell-through is not an inventory question. It is a portfolio question. Inventory moves because customers in specific portfolios consume specific unit volumes at specific price points. A SKU that is not selling at posted price may sell briskly to Declining customers at a 15% Settle Price discount, converting margin compression into volume that fuels reorder economics.

Negotiated commerce gives operators the mechanism to match each portfolio's historical price points and volume patterns. A Stable Q3 customer who has historically purchased 2.4 units per transaction at AOVs near $85 should be presented with bundle structures and pricing that meet or beat that pattern. A Declining Q5 customer who has historically purchased 1.1 units per transaction at AOVs near $30 with high discount rates should be presented with a CGO, not a posted promotion, and the operator's accept-line should be priced against their Settle Price history.

The cluster post on this topic is titled "Sell-Through by Portfolio: Using Negotiated Commerce to Match Customer Price Points and Volume Patterns," and it is the load-bearing tactical piece in this pillar.

## What This Pillar Is Not

Anti-drift fencing. CPM lives next to four other pillars and the lines blur fast.

- **Not Customer Yield.** Yield is acquisition, what happens before a customer is on file. CPM is what happens after. The handoff is at Stage 5, Portfolio, of the Yield Ladder.
- **Not Markup Performance.** Markup is what you price. CPM is who you are pricing for. The Discount Allowance and Market Adjustment Allowance fund the offers each portfolio receives, but the pricing math itself lives in Markup Performance.
- **Not Negotiated Commerce.** Negotiated Commerce is the worldview: pricing as a conversation. CPM is one of the systems that operates inside the worldview. It tells you which customers are in conversations and what their pattern looks like.
- **Not Agentic Commerce.** Agentic is who is negotiating on the buyer side: human, AI agent, hybrid. CPM is who they are in your file regardless of channel.
- **Not cohort analysis.** Cohorts measure when customers entered. CPM measures where customers are now. The two are not interchangeable, and one is dramatically more operationally useful.

## Start Here

Three entry points. Pick the one that matches where you are.

**"I want the argument for why CPM beats cohorts and RFM."**

Start with Cohorts Tell You When. Portfolios Tell You Where, the reframing essay.

**"I want to know what each of the six portfolios should be offered."**

The offer playbook above is the summary; the cluster posts for each portfolio go deep.

**"I want to see this running on my file."**

CPM is built into Prophet's analytics engine. The file classification runs nightly. Reach out for a portfolio walkthrough.

## The Subtopics

Manually curated authoritative links to cluster posts. Update one or two times per quarter.

### The Reframe

- Cohorts Tell You When. Portfolios Tell You Where.

### The Methodology

- Attrition Migration Tracking: The 25-Year-Old Methodology That Still Beats Modern Cohort Analysis
- Quintile Scoring vs RFM: Why Movement Matters More Than State

### The Portfolios In Depth

- The New Portfolio: How to Read First-Purchasers Before Their Second Order
- The Reactivated Portfolio: Why Win-Back Discounts Are the Wrong Offer
- The Growth Portfolio: Stop Discounting Customers Who Are Already Buying More
- The Stable Portfolio: The Silent Erosion to Declining
- The Declining Portfolio: The Portfolio Negotiated Commerce Was Built For
- The Defected Portfolio: Recapture Spend Should Match Prior Quintile

### Cross-Pillar Tactical Pieces

- Settle Price Patterns by Portfolio: What Customer Willingness-to-Pay Reveals
- Sell-Through by Portfolio: Using Negotiated Commerce to Match Customer Price Points and Volume Patterns
- Category Indexing Inside Portfolios: Finding Cross-Sell Opportunities by Behavioral State

## If Your Real Problem Is Somewhere Else

- **If acquisition cost is the issue** -> start at [Customer Yield](/blog/customer-yield). CPM tells you who you have; Yield tells you whether you can afford to find more of them.
- **If pricing math is the issue** -> start at [Markup Performance](/blog/markup-performance). The allowances are what fund the offers each portfolio receives.
- **If you want the worldview behind all of this** -> start at [Negotiated Commerce](/blog/negotiated-commerce).
- **If AI agents are starting to represent your customers** -> start at [Agentic Commerce](/blog/agentic-commerce).

## FAQ

**What is customer portfolio management?**

Customer Portfolio Management is the discipline of classifying every customer on file into one of six behavioral states: New, Reactivated, Growth, Stable, Declining, and Defected. CPM treats the customer file as a portfolio of distinct audiences rather than a single average, and prescribes a different offer mechanism for each state.

**How is customer portfolio management different from RFM segmentation?**

RFM segments customers by Recency, Frequency, and Monetary value at a single point in time. CPM segments customers by movement between behavioral states across two 12-month periods. RFM produces a static snapshot; CPM produces a directional signal. A customer who is RFM-high today but moving downward is invisible to RFM and obvious to CPM.

**How is customer portfolio management different from cohort analysis?**

Cohort analysis groups customers by entry date. It tells you when customers entered the brand. CPM groups customers by current behavioral state regardless of when they entered. A customer who entered in 2021 and a customer who entered in 2024 can both be in the Growth Q1 portfolio today; cohort analysis cannot see them as the same audience, but they should receive the same offer.

**What are the six portfolios in CPM?**

New, Reactivated, Growth, Stable, Declining, and Defected. New customers made their first purchase in P1. Reactivated customers purchased in P1 and P3 but not P2. Growth customers improved quintile rank from P2 to P1. Stable customers stayed in the same quintile. Declining customers dropped quintile rank. Defected customers purchased in P2 but not P1.

**Why use quintiles instead of percentage thresholds?**

Quintiles describe the customer's position relative to other customers on your file. Percentage thresholds describe the customer's position relative to themselves. A customer who spent $400 in P1 and $440 in P2 is a 10% decline by percentage threshold, but may have stayed Q2 by quintile rank because every other customer also reduced spending. Quintiles compare like to like across the file.

**Which portfolio is the highest priority for marketing investment?**

It depends on the business stage, but Declining Q1 and Defected Q1 are usually the highest-value recovery targets in any file. Growth Q1 is the highest-value retention target. New Q1 is the highest-value second-order target. Prioritize by quintile within each portfolio, not by raw portfolio counts.

**What offer should I send to a Declining customer?**

A customer-generated offer, not a posted discount. Declining customers know they are spending less, and a flat discount confirms what they already suspected: that the brand will negotiate downward when pressed. A CGO inverts the dynamic. The customer proposes their price, the system evaluates the proposal against the funded Discount Allowance, and the transaction either settles in the operator's favor or is declined.

**How often does the portfolio classification update?**

Daily in Prophet's CPM engine. Every transaction updates the underlying P1 and P2 windows. For operators not running CPM in software, the classification should be recomputed at minimum quarterly. Monthly is better. Annual is too infrequent because customers move between portfolios faster than annual cadence can track.

**Does CPM work for small Shopify stores?**

Yes, with one caveat. CPM requires a customer file large enough to quintile meaningfully: typically 1,000+ buyers minimum and 5,000+ for reliable quintile scoring within each portfolio. Stores under 1,000 buyers can still use the six portfolio classifications but may need to defer quintile scoring until the file grows.

## Footer CTA

**Your customer file is six audiences, not one.** CPM is built into Prophet's analytics engine and runs nightly across your transaction data. -> [Talk to us about a portfolio walkthrough](/contact)
